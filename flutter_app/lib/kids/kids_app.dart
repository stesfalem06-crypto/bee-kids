import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class BeeKidsApp extends StatefulWidget {
  const BeeKidsApp({super.key});

  @override
  State<BeeKidsApp> createState() => _BeeKidsAppState();
}

class _BeeKidsAppState extends State<BeeKidsApp> {
  int _currentTab = 0; // 0: ተጻወት (Play), 1: ቪድዮ (Videos), 2: ኮኾብ (Stars), 3: ቅጥዕታት (Settings)
  int _userStars = 12;
  int _streakDays = 5;
  List<dynamic> _levels = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadLevels();
  }

  Future<void> _loadLevels() async {
    try {
      final str = await rootBundle.loadString('assets/content/singapore_math_tigrinya.json');
      setState(() {
        _levels = jsonDecode(str);
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ቢ ኪድስ - Bee Kids',
      theme: ThemeData(
        brightness: Brightness.light,
        scaffoldBackgroundColor: const Color(0xFFFFFBEB),
        primaryColor: const Color(0xFFF59E0B),
        fontFamily: 'Noto Sans Ethiopic',
      ),
      home: Scaffold(
        backgroundColor: const Color(0xFFFFFBEB),
        appBar: AppBar(
          backgroundColor: const Color(0xFFFEF3C7),
          elevation: 2,
          title: Row(
            children: [
              const Text(
                '🐝 ቢ ኪድስ',
                style: TextStyle(
                  color: Color(0xFF92400E),
                  fontWeight: FontWeight.w900,
                  fontSize: 22,
                ),
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: Colors.amber.shade300,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.star, color: Colors.amber, size: 20),
                    const SizedBox(width: 4),
                    Text(
                      '$_userStars',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.black87),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: Colors.orange.shade200,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  children: [
                    const Text('🔥 ', style: TextStyle(fontSize: 14)),
                    Text(
                      '$_streakDays መዓልቲ',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.brown),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        body: _isLoading
            ? const Center(child: CircularProgressIndicator(color: Colors.amber))
            : _buildTabBody(),
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: _currentTab,
          onTap: (idx) {
            if (idx == 3) {
              _openParentGate();
            } else {
              setState(() => _currentTab = idx);
            }
          },
          selectedItemColor: const Color(0xFFB45309),
          unselectedItemColor: Colors.black45,
          backgroundColor: const Color(0xFFFEF3C7),
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
          type: BottomNavigationBarType.fixed,
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.play_circle_fill, size: 28), label: 'ተጻወት (Play)'),
            BottomNavigationBarItem(icon: Icon(Icons.video_collection, size: 28), label: 'ቪድዮ (Videos)'),
            BottomNavigationBarItem(icon: Icon(Icons.map, size: 28), label: 'ካርታ (Map)'),
            BottomNavigationBarItem(icon: Icon(Icons.lock, size: 28), label: 'ቅጥዕታት (Parents)'),
          ],
        ),
      ),
    );
  }

  Widget _buildTabBody() {
    switch (_currentTab) {
      case 0:
      case 2:
        return _buildLevelPath();
      case 1:
        return _buildVideoFeed();
      default:
        return _buildLevelPath();
    }
  }

  Widget _buildLevelPath() {
    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      itemCount: _levels.length,
      itemBuilder: (context, index) {
        final lvl = _levels[index];
        final lessons = (lvl['lessons'] as List<dynamic>?) ?? [];

        return Container(
          margin: const EdgeInsets.only(bottom: 24),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(24),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.06),
                blurRadius: 12,
                offset: const Offset(0, 4),
              )
            ],
            border: Border.all(color: Colors.amber.shade200, width: 2),
          ),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    CircleAvatar(
                      radius: 20,
                      backgroundColor: Colors.amber.shade400,
                      child: Text(
                        '${lvl['level']}',
                        style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 18),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            lvl['titleTigrinya'] ?? '',
                            style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16, color: Color(0xFF78350F)),
                          ),
                          Text(
                            lvl['descriptionTigrinya'] ?? '',
                            style: TextStyle(fontSize: 13, color: Colors.grey.shade700),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                ...lessons.map((lesson) => Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFF59E0B),
                      foregroundColor: Colors.white,
                      elevation: 4,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
                    ),
                    onPressed: () => _openLesson(lesson),
                    child: Row(
                      children: [
                        const Icon(Icons.star, color: Colors.yellow, size: 24),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            lesson['titleTigrinya'] ?? '',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.black87),
                          ),
                        ),
                        const Icon(Icons.arrow_forward_ios, size: 16, color: Colors.black54),
                      ],
                    ),
                  ),
                )),
              ],
            ),
          ),
        );
      },
    );
  }

  void _openLesson(dynamic lesson) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => Scaffold(
          backgroundColor: const Color(0xFFFFFBEB),
          appBar: AppBar(
            backgroundColor: const Color(0xFFFEF3C7),
            title: Text(
              lesson['titleTigrinya'] ?? '',
              style: const TextStyle(color: Color(0xFF78350F), fontWeight: FontWeight.bold),
            ),
            iconTheme: const IconThemeData(color: Color(0xFF78350F)),
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // Story / Prompt card
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.amber.shade300, width: 2),
                  ),
                  child: Column(
                    children: [
                      Text(
                        lesson['storyTigrinya'] ?? '',
                        textAlign: TextAlign.center,
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Color(0xFF92400E)),
                      ),
                      const SizedBox(height: 12),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.amber.shade100,
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.volume_up, color: Colors.amber, size: 22),
                            const SizedBox(width: 8),
                            Text(
                              lesson['audioVoicePrompt'] ?? '',
                              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.brown),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 30),

                // CPA Manipulative Display
                if (lesson['manipulative'] != null)
                  _buildManipulatives(lesson['manipulative']),

                if (lesson['numberBond'] != null)
                  _buildNumberBond(lesson['numberBond']),

                const SizedBox(height: 30),

                // Big Answer Buttons
                const Text(
                  'ትክክለኛ መልሲ ምረጽ (Tap the Answer):',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF78350F)),
                ),
                const SizedBox(height: 16),
                Wrap(
                  spacing: 16,
                  runSpacing: 16,
                  alignment: WrapAlignment.center,
                  children: ((lesson['choices'] as List<dynamic>?) ?? []).map((choice) {
                    return SizedBox(
                      width: 140,
                      height: 72,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: Colors.black,
                          elevation: 4,
                          side: BorderSide(color: Colors.amber.shade400, width: 3),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                        ),
                        onPressed: () {
                          final isCorrect = choice.toString() == lesson['correctAnswer'].toString();
                          _handleChoice(isCorrect, lesson['explanationTigrinya']);
                        },
                        child: Text(
                          choice.toString(),
                          style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900),
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildManipulatives(dynamic manip) {
    final count = (manip['count'] as int?) ?? 4;
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      alignment: WrapAlignment.center,
      children: List.generate(count, (index) {
        return Container(
          width: 60,
          height: 60,
          decoration: BoxDecoration(
            color: Colors.red.shade400,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: Colors.red.shade200,
                blurRadius: 8,
                offset: const Offset(0, 4),
              )
            ],
          ),
          child: const Center(
            child: Text('🍎', style: TextStyle(fontSize: 32)),
          ),
        );
      }),
    );
  }

  Widget _buildNumberBond(dynamic bond) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          CircleAvatar(
            radius: 32,
            backgroundColor: Colors.teal.shade500,
            child: Text('${bond['whole']}', style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircleAvatar(
                radius: 26,
                backgroundColor: Colors.amber.shade500,
                child: Text('${bond['part1'] ?? "?"}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
              ),
              const SizedBox(width: 40),
              CircleAvatar(
                radius: 26,
                backgroundColor: Colors.orange.shade500,
                child: Text('${bond['part2'] ?? "?"}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
              ),
            ],
          ),
        ],
      ),
    );
  }

  void _handleChoice(bool isCorrect, String? explanation) {
    if (isCorrect) {
      setState(() => _userStars += 3);
      showDialog(
        context: context,
        builder: (_) => AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
          title: const Text('🎉 ብጣዕሚ ጐበዝ! (Correct!)', textAlign: TextAlign.center, style: TextStyle(fontWeight: FontWeight.bold, color: Colors.green)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('⭐ ⭐ ⭐', style: TextStyle(fontSize: 32)),
              const SizedBox(height: 12),
              Text(explanation ?? '', textAlign: TextAlign.center, style: const TextStyle(fontSize: 16)),
            ],
          ),
          actions: [
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                onPressed: () {
                  Navigator.pop(context); // close dialog
                  Navigator.pop(context); // back to map
                },
                child: const Text('ቀጽል (Continue)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('ደጊምካ ፈትን! ሓሳብካ ኣስተውዕል። (Try again!)'),
          backgroundColor: Colors.orange,
        ),
      );
    }
  }

  Widget _buildVideoFeed() {
    return const Center(
      child: Text(
        'ቪድዮታት (Encrypted .beekid Video Packs)\nTikTok-style vertical reels for Singapore Math',
        textAlign: TextAlign.center,
        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF78350F)),
      ),
    );
  }

  void _openParentGate() {
    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('መእተዊ ወለዲ (Parent Gate)'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('ሕቶ ንወለዲ: 7 × 8 = ?', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 8),
            TextField(
              controller: controller,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(border: OutlineInputBorder(), hintText: 'መልሲ...'),
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () {
              if (controller.text.trim() == '56') {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('ቅጥዕታት ተኸፊቱ (Settings Unlocked)')));
              } else {
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('ስሕተት መልሲ!')));
              }
            },
            child: const Text('እቶ (Enter)'),
          ),
        ],
      ),
    );
  }
}
