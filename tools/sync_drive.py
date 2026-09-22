#!/usr/bin/env python3
"""
Drive content synchronization and asset verification tool for Bee Education Suite.
Public Google Drive: https://drive.google.com/drive/folders/131PrmB6nsCXflqKDsTOoJ1iHmLCFvcQG?usp=sharing
"""

import os
import sys
import json
import argparse

def verify_assets():
    required_files = [
        'flutter_app/assets/content/unit_notes.json',
        'flutter_app/assets/content/exams.json',
        'flutter_app/assets/content/singapore_math_tigrinya.json'
    ]
    missing = []
    for f in required_files:
        if not os.path.exists(f):
            missing.append(f)
        else:
            size = os.path.getsize(f)
            print(f"[OK] {f} ({size} bytes)")

    if missing:
        print(f"[ERROR] Missing required asset files: {missing}")
        sys.exit(1)

    print("\nAll offline learning packs and national examinations verified successfully!")
    return True

def main():
    parser = argparse.ArgumentParser(description="Sync or verify Drive curriculum content")
    parser.add_argument("--check-assets", action="store_true", help="Verify offline JSON packs exist")
    args = parser.parse_args()

    if args.check_assets:
        verify_assets()
    else:
        print("Running asset verification...")
        verify_assets()

if __name__ == "__main__":
    main()
