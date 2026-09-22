import os
import zipfile
import sys

def make_zip(output_path):
    # Ensure parent dir exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        # Add flutter_app
        for root, dirs, files in os.walk('flutter_app'):
            for f in files:
                full_p = os.path.join(root, f)
                zf.write(full_p, full_p)
                
        # Add .github/workflows
        for root, dirs, files in os.walk('.github'):
            for f in files:
                full_p = os.path.join(root, f)
                zf.write(full_p, full_p)
                
        # Add tools
        for root, dirs, files in os.walk('tools'):
            for f in files:
                full_p = os.path.join(root, f)
                zf.write(full_p, full_p)
                
        # Add README and configs
        for f in ['README.md', 'package.json', '.gitignore']:
            if os.path.exists(f):
                zf.write(f, f)
                
    print(f"Zip created at {output_path}, size: {os.path.getsize(output_path)} bytes")

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else 'dist/bee-education-flutter.zip'
    make_zip(out)
