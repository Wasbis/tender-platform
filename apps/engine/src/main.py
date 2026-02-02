import asyncio
from playwright.async_api import async_playwright
import pandas as pd
import os
import re
import json
from datetime import datetime

TARGET_URL = "https://civd.skkmigas.go.id/index.jwebs"


async def run():
    print("🕵️‍♂️  CIVD Crawler V5: Enhanced Metadata Protocol Initiated...")

    # Variabel Tracking
    failed_count = 0
    all_tenders = []
    page_num = 1
    has_next_page = True
    scrape_status = "success"

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()

        print(f"🌐 Mengakses: {TARGET_URL}")

        try:
            await page.goto(TARGET_URL, timeout=60000)
            print("⏳ Menunggu data awal...")
            await page.wait_for_selector(
                "#tnd1Result .card", state="visible", timeout=30000
            )

            while has_next_page:
                print(f"\n📄 Sedang memproses Halaman {page_num}...")

                # 1. Ambil Semua Card di Halaman Ini
                cards = page.locator("#tnd1Result .card")
                count = await cards.count()
                print(f"   🎯 Terdeteksi {count} tender di halaman ini.")

                for i in range(count):
                    try:
                        card = cards.nth(i)

                        # --- Parsing Basic Info ---
                        title = await card.locator(".card-title").inner_text()
                        subtitle = await card.locator(".card-subtitle").inner_text()

                        # Regex untuk Tanggal & Agency
                        deadline = "Unknown"
                        agency = "Unknown"

                        # Pola: 05 Feb 2026
                        date_match = re.search(r"(\d{2}\s[A-Za-z]{3}\s\d{4})", subtitle)
                        if date_match:
                            deadline = date_match.group(1)

                        # Pola: Oleh [Agency]
                        if "Oleh" in subtitle:
                            agency = subtitle.split("Oleh")[-1].strip()

                        # --- Parsing Detail (Advanced Regex) ---
                        # Kita ambil raw text dari element .tipe
                        tipe_text = await card.locator(".tipe").inner_text()

                        # Normalisasi spasi (ubah newline jadi spasi biasa biar regex jalan mulus)
                        clean_tipe = " ".join(tipe_text.split())

                        # Default values
                        golongan = "-"
                        jenis_pengadaan = "-"
                        bidang_usaha = "-"

                        # Regex Pattern Matching
                        # Cari teks di antara "Golongan Usaha:" dan "Jenis Pengadaan"
                        match_gol = re.search(
                            r"Golongan Usaha\s*:\s*(.*?)\s*Jenis Pengadaan",
                            clean_tipe,
                            re.IGNORECASE,
                        )
                        if match_gol:
                            golongan = match_gol.group(1).strip()

                        # Cari teks di antara "Jenis Pengadaan :" dan "Bidang Usaha"
                        match_jenis = re.search(
                            r"Jenis Pengadaan\s*:\s*(.*?)\s*Bidang Usaha",
                            clean_tipe,
                            re.IGNORECASE,
                        )
                        if match_jenis:
                            jenis_pengadaan = match_jenis.group(1).strip()

                        # Cari teks setelah "Bidang Usaha :" sampai ketemu "Jenis Pengumuman" atau akhir string
                        match_bidang = re.search(
                            r"Bidang Usaha\s*:\s*(.*?)\s*(?:Jenis Pengumuman|$)",
                            clean_tipe,
                            re.IGNORECASE,
                        )
                        if match_bidang:
                            bidang_usaha = match_bidang.group(1).strip()

                        # Susun Data Object
                        data = {
                            "id": len(all_tenders) + 1,
                            "title": title.strip(),
                            "agency": agency,
                            "deadline": deadline,
                            "golongan": golongan,
                            "jenis_pengadaan": jenis_pengadaan,
                            "bidang_usaha": bidang_usaha,  # Data lengkap, bisa dipotong di frontend kalau kepanjangan
                            "status": "Undangan Prakualifikasi",
                            "source_url": TARGET_URL,
                            "page_found": page_num,
                        }

                        all_tenders.append(data)

                        # Print progress ringan
                        if i % 5 == 0:
                            print(f"   ✅ Collected: {title[:30]}...")

                    except Exception as item_err:
                        print(f"   ⚠️ Gagal parse item ke-{i}: {item_err}")
                        failed_count += 1

                # 2. Cek Tombol Next Page (Pagination Logic)
                next_btn = page.locator("#tnd1Result .pagelinks a[title='Next']")

                if await next_btn.count() > 0:
                    classes = await next_btn.get_attribute("class")
                    if "disable" in classes:
                        print("🛑 Reached end of list.")
                        has_next_page = False
                    else:
                        print("➡️  Navigasi ke Halaman berikutnya...")
                        await next_btn.click()
                        await page.wait_for_load_state("networkidle")
                        await page.wait_for_timeout(2000)  # Safety delay
                        page_num += 1
                else:
                    print("🛑 Tombol Next tidak ditemukan.")
                    has_next_page = False

        except Exception as e:
            print(f"❌ Error Critical Scraper: {e}")
            scrape_status = "failed"
            await page.screenshot(path="logs/error_critical.png")

        finally:
            # 3. Finalisasi & Penyimpanan Data (Tetap jalan meski error di tengah)
            await browser.close()

            # Construct Metadata
            meta_data = {
                "scraped_at": datetime.now().isoformat(),
                "status": scrape_status,
                "source": "CIVD - Undangan Prakualifikasi",
                "total_data_found": len(all_tenders),
                "failed_count": failed_count,
                "pagination_scanned": page_num,
                "target_url": TARGET_URL,
            }

            final_response = {"meta": meta_data, "data": all_tenders}

            # Buat Folder Logs
            os.makedirs("logs", exist_ok=True)

            # Simpan JSON (Structured)
            json_path = "logs/tenders_full.json"
            with open(json_path, "w", encoding="utf-8") as f:
                json.dump(final_response, f, indent=2, ensure_ascii=False)

            # Simpan CSV (Flat Data only)
            if all_tenders:
                csv_path = "logs/tenders_full.csv"
                df = pd.DataFrame(all_tenders)
                df.to_csv(csv_path, index=False)

            print("\n📊 --- LAPORAN MISI ---")
            print(f"Status      : {scrape_status.upper()}")
            print(f"Total Data  : {len(all_tenders)}")
            print(f"Gagal Parse : {failed_count}")
            print(f"JSON Output : {json_path}")

            if scrape_status == "success" and len(all_tenders) > 0:
                print(f"Sample Data : {all_tenders[0]['title'][:30]}...")


if __name__ == "__main__":
    asyncio.run(run())
