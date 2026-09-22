# Bee Education Suite — Junior Bee (G6–G8) & Bee Kids (Ages 4–10)

Production offline educational applications for the Eritrean curriculum, built with Flutter, Singapore Math pedagogy, and offline cryptographic licensing.

## Products Overview

| App | Target Audience | Curriculum & Content | Language | Package ID |
|---|---|---|---|---|
| **Junior Bee** | Grades 6–8 | Official Eritrean Junior Textbooks & National Exams | English + Tigrinya onboarding | `com.bee.junior` |
| **Bee Kids** | Ages 4–10 | Singapore Math (CPA, Number Bonds, Bar Models) | **100% Tigrinya UI** (Ge'ez script) | `com.bee.kids` |
| **Bee Seller** | Desktop tool | Offline QR / 16-character license generator & video packer | English / Desktop | Tools & API |

---

## 1. Automated GitHub Actions APK Builds

On every push to `main`, GitHub Actions (`.github/workflows/build-apk.yml`) compiles both production release APKs:

1. **Junior Bee Release APK** -> `build_output/junior/Junior_Bee_G6_G8_Release.apk`
2. **Bee Kids Release APK** -> `build_output/kids/Bee_Kids_Tigrinya_Release.apk`

Download the completed APKs anytime from your GitHub repository under **Actions → Artifacts**:
- `junior-apks`
- `bee-kids-apks`

### Pushing to your GitHub Repository:
```bash
# Add your repository remote
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# Push to main (this triggers the automated APK build workflow)
git push -u origin main
```
Or use the **Push to GitHub** station built into this web application!

---

## 2. Curriculum Data & Offline Storage

- `assets/content/unit_notes.json`: Unit-by-unit notes, key terms, key ideas, worked examples, and exercises with solutions for Grades 6, 7, and 8.
- `assets/content/exams.json`: 2012–2019 Eritrean Grade 8 National Examinations (English, Science, Citizenship Education, Social Studies).
- `assets/content/singapore_math_tigrinya.json`: 100% Tigrinya Singapore Math levels with CPA manipulatives, Number Bonds, and Bar Models.

---

## 3. Bee Seller Offline Licensing Architecture

No internet or account registration is required for students to unlock the apps.
- **Device ID**: Each device generates a unique hardware identifier (e.g., `BEE-JUNIOR-8821`).
- **Activation Code**: Bee Seller computes an offline HMAC-SHA256 signature formatted as a 16-character code (`XXXX-XXXX-XXXX-XXXX`) or a QR code.
- **Offline Verification**: The app verifies the cryptographic signature offline inside `lib/licensing/bee_license.dart`.

To generate a license via CLI:
```bash
python3 tools/generate_license.py --device-id BEE-JUNIOR-8821 --app junior
```

---

## 4. Video Pack Encryption (`.beekid` format)

Videos are packaged and encrypted with headers so they can only be played inside the unlocked Bee Kids application:
```bash
python3 tools/package_video.py --input video.mp4 --output math_reel_01.beekid --title "ናይ ቍጽሪ ደርፊ"
```
