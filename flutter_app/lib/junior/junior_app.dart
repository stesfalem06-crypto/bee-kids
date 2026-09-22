import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../licensing/bee_license.dart';

class JuniorBeeApp extends StatefulWidget {
  const JuniorBeeApp({super.key});

  @override
  State<JuniorBeeApp> createState() => _JuniorBeeAppState();
}

class _JuniorBeeAppState extends State<JuniorBeeApp> {
  int _currentIndex = 0;
  int _selectedGrade = 6;
  String _selectedSubjectKey = 'all';
  List<dynamic> _units = [];
  List<dynamic> _exams = [];
  bool _isLoading = true;
  bool _isUnlocked = true;
  String _deviceId = 'BEE-JUNIOR-8821';

  @override
  void initState() {
    super.initState();
    _loadContent();
  }

  Future<void> _loadContent() async {
    try {
      final notesString = await rootBundle.loadString('assets/content/unit_notes.json');
      final examsString = await rootBundle.loadString('assets/content/exams.json');
      setState(() {
        _units = jsonDecode(notesString);
        _exams = jsonDecode(examsString);
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    const tealColor = Color(0xFF0D9488);
    const amberColor = Color(0xFFF59E0B);

    return MaterialApp(
      title: 'Junior Bee (G6-G8)',
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: tealColor,
        scaffoldBackgroundColor: const Color(0xFF0F172A),
        colorScheme: const ColorScheme.dark(
          primary: tealColor,
          secondary: amberColor,
          surface: Color(0xFF1E293B),
        ),
      ),
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: const Color(0xFF1E293B),
          elevation: 0,
          title: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: amberColor.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(Icons.school, color: amberColor, size: 20),
              ),
              const SizedBox(width: 10),
              const Text(
                'Junior Bee',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: tealColor.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: tealColor),
                ),
                child: const Text('G6–G8', style: TextStyle(fontSize: 12, color: tealColor)),
              ),
            ],
          ),
          actions: [
            IconButton(
              icon: Icon(
                _isUnlocked ? Icons.verified : Icons.lock_outline,
                color: _isUnlocked ? Colors.greenAccent : Colors.orangeAccent,
              ),
              onPressed: () => _showUnlockDialog(context),
            ),
          ],
        ),
        body: _isLoading
            ? const Center(child: CircularProgressIndicator(color: tealColor))
            : _buildBody(),
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) => setState(() => _currentIndex = index),
          backgroundColor: const Color(0xFF0F172A),
          selectedItemColor: amberColor,
          unselectedItemColor: Colors.white54,
          type: BottomNavigationBarType.fixed,
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
            BottomNavigationBarItem(icon: Icon(Icons.menu_book), label: 'Notes'),
            BottomNavigationBarItem(icon: Icon(Icons.quiz), label: 'Practice'),
            BottomNavigationBarItem(icon: Icon(Icons.assignment), label: 'Exams'),
            BottomNavigationBarItem(icon: Icon(Icons.psychology), label: 'Coach'),
          ],
        ),
      ),
    );
  }

  Widget _buildBody() {
    switch (_currentIndex) {
      case 0:
        return _buildHomeTab();
      case 1:
        return _buildNotesTab();
      case 2:
        return _buildPracticeTab();
      case 3:
        return _buildExamsTab();
      case 4:
        return _buildCoachTab();
      default:
        return _buildHomeTab();
    }
  }

  Widget _buildHomeTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Grade selector chips
          const Text('Select Grade', style: TextStyle(fontSize: 14, color: Colors.white70)),
          const SizedBox(height: 8),
          Row(
            children: [6, 7, 8].map((g) {
              final isSelected = _selectedGrade == g;
              return Padding(
                padding: const EdgeInsets.only(right: 8),
                child: ChoiceChip(
                  label: Text('Grade $g', style: const TextStyle(fontWeight: FontWeight.bold)),
                  selected: isSelected,
                  selectedColor: const Color(0xFF0D9488),
                  backgroundColor: const Color(0xFF1E293B),
                  onSelected: (val) => setState(() => _selectedGrade = g),
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 20),

          // Subject Chips
          const Text('Core Curriculum Subjects', style: TextStyle(fontSize: 14, color: Colors.white70)),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              _buildSubjectChip('all', 'All Subjects (ኩሎም)', Icons.apps),
              _buildSubjectChip('math', 'Mathematics (ሒሳብ)', Icons.calculate),
              _buildSubjectChip('science', 'Science (ሳይንስ)', Icons.science),
              _buildSubjectChip('english', 'English (እንግሊዝኛ)', Icons.menu_book),
              _buildSubjectChip('social_studies', 'Social Studies (ማሕበራዊ)', Icons.public),
              _buildSubjectChip('citizenship', 'Citizenship (ስነ-ዜጋ)', Icons.shield),
              _buildSubjectChip('ict', 'ICT (ቴክኖሎጂ)', Icons.computer),
              _buildSubjectChip('life_skills', 'Life Skills (ናይ ህይወት)', Icons.volunteer_activism),
            ],
          ),
          const SizedBox(height: 24),

          // Unit Cards for Selected Grade & Subject
          Text(
            'Grade $_selectedGrade Units',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          ..._getFilteredUnits().map((unit) => _buildUnitCard(unit)).toList(),
        ],
      ),
    );
  }

  Widget _buildSubjectChip(String key, String label, IconData icon) {
    final isSelected = _selectedSubjectKey == key;
    return InkWell(
      onTap: () => setState(() => _selectedSubjectKey = key),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFFF59E0B) : const Color(0xFF1E293B),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? Colors.amber : Colors.white12,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 16, color: isSelected ? Colors.black : Colors.white70),
            const SizedBox(width: 6),
            Text(
              label,
              style: TextStyle(
                color: isSelected ? Colors.black : Colors.white,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                fontSize: 13,
              ),
            ),
          ],
        ),
      ),
    );
  }

  List<dynamic> _getFilteredUnits() {
    return _units.where((u) {
      final matchesGrade = u['grade'] == _selectedGrade;
      final matchesSubject = _selectedSubjectKey == 'all' || u['subjectKey'] == _selectedSubjectKey;
      return matchesGrade && matchesSubject;
    }).toList();
  }

  Widget _buildUnitCard(dynamic unit) {
    return Card(
      color: const Color(0xFF1E293B),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: const Color(0xFF0D9488).withOpacity(0.2),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    'Unit ${unit['unitNumber']}',
                    style: const TextStyle(color: Color(0xFF2DD4BF), fontWeight: FontWeight.bold),
                  ),
                ),
                const Spacer(),
                Text(
                  unit['subject'] ?? '',
                  style: const TextStyle(color: Colors.white54, fontSize: 12),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              unit['title'] ?? '',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 6),
            Text(
              unit['summary'] ?? '',
              style: const TextStyle(color: Colors.white70, fontSize: 13),
            ),
            const SizedBox(height: 14),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF0D9488),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                    onPressed: () => _openUnitNotes(unit),
                    icon: const Icon(Icons.book, size: 18),
                    label: const Text('Notes', style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFF59E0B),
                      foregroundColor: Colors.black,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                    onPressed: () => _openUnitPractice(unit),
                    icon: const Icon(Icons.quiz, size: 18),
                    label: const Text('Practice', style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _openUnitNotes(dynamic unit) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => Scaffold(
          appBar: AppBar(
            title: Text(unit['title'] ?? 'Notes'),
            backgroundColor: const Color(0xFF1E293B),
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Key Ideas & Principles', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.amber)),
                const SizedBox(height: 8),
                ...?((unit['keyIdeas'] as List<dynamic>?)?.map((idea) => Padding(
                  padding: const EdgeInsets.only(bottom: 6),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('• ', style: TextStyle(color: Colors.amber, fontSize: 16)),
                      Expanded(child: Text(idea.toString(), style: const TextStyle(fontSize: 14))),
                    ],
                  ),
                ))),
                const Divider(height: 32, color: Colors.white24),
                const Text('Worked Examples (Step-by-Step)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.tealAccent)),
                const SizedBox(height: 12),
                ...?((unit['examples'] as List<dynamic>?)?.map((ex) => Card(
                  color: const Color(0xFF0F172A),
                  margin: const EdgeInsets.only(bottom: 12),
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(ex['title'] ?? '', style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.amber)),
                        const SizedBox(height: 4),
                        Text(ex['problem'] ?? '', style: const TextStyle(fontStyle: FontStyle.italic)),
                        const SizedBox(height: 8),
                        ...((ex['solutionSteps'] as List<dynamic>?)?.map((step) => Text(step.toString(), style: const TextStyle(fontSize: 13, color: Colors.white70))) ?? []),
                        const SizedBox(height: 6),
                        Text('Answer: ${ex['finalAnswer']}', style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.greenAccent)),
                      ],
                    ),
                  ),
                ))),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _openUnitPractice(dynamic unit) {
    final exercises = (unit['exercises'] as List<dynamic>?) ?? [];
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => Scaffold(
          appBar: AppBar(
            title: Text('${unit['title']} - Practice'),
            backgroundColor: const Color(0xFF1E293B),
          ),
          body: ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: exercises.length,
            itemBuilder: (context, index) {
              final ex = exercises[index];
              return _ExerciseCard(exercise: ex);
            },
          ),
        ),
      ),
    );
  }

  Widget _buildNotesTab() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _units.length,
      itemBuilder: (context, index) => _buildUnitCard(_units[index]),
    );
  }

  Widget _buildPracticeTab() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _units.length,
      itemBuilder: (context, index) {
        final unit = _units[index];
        return ListTile(
          tileColor: const Color(0xFF1E293B),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          leading: const CircleAvatar(
            backgroundColor: Color(0xFF0D9488),
            child: Icon(Icons.quiz, color: Colors.white),
          ),
          title: Text(unit['title'] ?? ''),
          subtitle: Text('Grade ${unit['grade']} • ${unit['subject']}'),
          trailing: const Icon(Icons.arrow_forward_ios, size: 16),
          onTap: () => _openUnitPractice(unit),
        );
      },
    );
  }

  Widget _buildExamsTab() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _exams.length,
      itemBuilder: (context, index) {
        final exam = _exams[index];
        return Card(
          color: const Color(0xFF1E293B),
          margin: const EdgeInsets.only(bottom: 12),
          child: ListTile(
            leading: const Icon(Icons.assignment_turned_in, color: Colors.amber, size: 36),
            title: Text(exam['title'] ?? '', style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text('${exam['totalQuestions']} Questions • ${exam['durationMinutes']} mins'),
            trailing: ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF0D9488)),
              child: const Text('Start'),
              onPressed: () {
                // Open exam runner
              },
            ),
          ),
        );
      },
    );
  }

  Widget _buildCoachTab() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.amber.withOpacity(0.3)),
            ),
            child: const Row(
              children: [
                Icon(Icons.psychology, size: 36, color: Colors.amber),
                SizedBox(width: 12),
                Expanded(
                  child: Text(
                    'Offline Curriculum Coach\nAsk questions bound to Eritrean Junior Textbooks.',
                    style: TextStyle(fontSize: 14),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _showUnlockDialog(BuildContext context) {
    final codeController = TextEditingController();
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text('Bee Seller Offline Unlock'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Device ID: $_deviceId', style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.amber)),
            const SizedBox(height: 12),
            const Text('Enter the 16-character code issued by your local Bee Seller:', style: TextStyle(fontSize: 13)),
            const SizedBox(height: 8),
            TextField(
              controller: codeController,
              decoration: const InputDecoration(
                hintText: 'XXXX-XXXX-XXXX-XXXX',
                border: OutlineInputBorder(),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF0D9488)),
            onPressed: () {
              final isValid = BeeLicenseService.verifyCode(_deviceId, codeController.text, appType: 'junior');
              if (isValid) {
                setState(() => _isUnlocked = true);
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('App successfully unlocked!')));
              } else {
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Invalid code for this device.')));
              }
            },
            child: const Text('Unlock'),
          ),
        ],
      ),
    );
  }
}

class _ExerciseCard extends StatefulWidget {
  final dynamic exercise;
  const _ExerciseCard({required this.exercise});

  @override
  State<_ExerciseCard> createState() => _ExerciseCardState();
}

class _ExerciseCardState extends State<_ExerciseCard> {
  bool _showAnswer = false;

  @override
  Widget build(BuildContext context) {
    final ex = widget.exercise;
    final options = (ex['options'] as List<dynamic>?) ?? [];

    return Card(
      color: const Color(0xFF1E293B),
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Question ${ex['num']}:', style: const TextStyle(color: Colors.amber, fontWeight: FontWeight.bold)),
            const SizedBox(height: 6),
            Text(ex['question'] ?? '', style: const TextStyle(fontSize: 15)),
            const SizedBox(height: 12),
            ...options.map((opt) => Padding(
              padding: const EdgeInsets.only(bottom: 6),
              child: Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: const Color(0xFF0F172A),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(opt.toString()),
              ),
            )),
            const SizedBox(height: 10),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: _showAnswer ? Colors.green : const Color(0xFF0D9488),
              ),
              onPressed: () => setState(() => _showAnswer = !_showAnswer),
              child: Text(_showAnswer ? 'Hide Solution' : 'Reveal Answer & Explanation'),
            ),
            if (_showAnswer) ...[
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.green.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.green),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Correct Answer: ${ex['answer']}', style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.greenAccent)),
                    const SizedBox(height: 4),
                    Text(ex['explanation'] ?? '', style: const TextStyle(fontSize: 13, color: Colors.white70)),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
