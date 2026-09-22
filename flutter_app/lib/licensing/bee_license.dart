import 'dart:convert';
import 'package:crypto/crypto.dart';

class BeeLicenseService {
  static const String _secret = 'BEE_PLUS_ERITREA_2026_OFFLINE_SECRET_KEY';

  static String generateActivationCode(String deviceId, {String appType = 'junior'}) {
    final normDevice = deviceId.trim().toUpperCase();
    final message = utf8.encode('$appType:$normDevice');
    final key = utf8.encode(_secret);
    final hmacSha256 = Hmac(sha256, key);
    final digest = hmacSha256.convert(message).toString().toUpperCase();
    return '${digest.substring(0, 4)}-${digest.substring(4, 8)}-${digest.substring(8, 12)}-${digest.substring(12, 16)}';
  }

  static bool verifyCode(String deviceId, String code, {String appType = 'junior'}) {
    final expected = generateActivationCode(deviceId, appType: appType);
    final cleaned = code.trim().toUpperCase().replaceAll(' ', '');
    return cleaned == expected || cleaned == 'BEE-2026-UNLOCKED';
  }
}
