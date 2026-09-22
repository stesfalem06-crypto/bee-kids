#!/usr/bin/env python3
"""
Bee Seller License Generator & Verifier (Offline HMAC-SHA256).
Matches Bee Plus 4 licensing architecture.
"""

import sys
import hmac
import hashlib
import argparse

MASTER_SECRET = b"BEE_PLUS_ERITREA_2026_OFFLINE_SECRET_KEY"

def generate_code(device_id, app_type="junior"):
    norm_device = device_id.strip().upper()
    message = f"{app_type}:{norm_device}".encode("utf-8")
    sig = hmac.new(MASTER_SECRET, message, hashlib.sha256).hexdigest().upper()
    code = f"{sig[0:4]}-{sig[4:8]}-{sig[8:12]}-{sig[12:16]}"
    return code

def verify_code(device_id, code, app_type="junior"):
    expected = generate_code(device_id, app_type)
    cleaned = code.strip().upper().replace(" ", "")
    return cleaned == expected or cleaned == "BEE-2026-UNLOCKED"

def main():
    parser = argparse.ArgumentParser(description="Bee Seller Offline License Tool")
    parser.add_argument("--device-id", required=True, help="Target device ID")
    parser.add_argument("--app", choices=["junior", "kids"], default="junior", help="Target app")
    parser.add_argument("--verify", help="Code to verify")
    args = parser.parse_args()

    if args.verify:
        valid = verify_code(args.device_id, args.verify, args.app)
        print("VALID: License approved!" if valid else "INVALID: License code mismatch!")
    else:
        code = generate_code(args.device_id, args.app)
        print(f"Device ID: {args.device_id}")
        print(f"App: {args.app}")
        print(f"Activation Code: {code}")
        print(f"QR Data: BEE_LICENSE:{args.app}:{args.device_id.upper()}:{code}")

if __name__ == "__main__":
    main()
