import sys
from collections import Counter
import struct

def get_dominant_colors(image_path, num_colors=6):
    try:
        # We don't have PIL installed by default in some envs, so let's try a pure python approach 
        # or assume we might need to install it. 
        # Actually, let's try to use a simple heuristic or check if PIL is available.
        try:
            from PIL import Image
        except ImportError:
            print("PIL not found. Please install Pillow.")
            return

        img = Image.open(image_path)
        img = img.convert("RGB")
        img = img.resize((150, 150)) # Resize to speed up
        
        pixels = list(img.getdata())
        counts = Counter(pixels)
        common = counts.most_common(num_colors + 10) # Get more to filter out white/black
        
        final_colors = []
        for color, count in common:
            # Filter out very dark or very light if needed, but for gradient we want the colors
            # Let's just return the hex
            hex_color = '#{:02x}{:02x}{:02x}'.format(*color)
            final_colors.append(hex_color)
            
        print("Dominant Colors:", final_colors)

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_dominant_colors('/Users/amankumar/.gemini/antigravity/brain/068fe473-caf0-4884-92b4-4ea05b3020cc/uploaded_image_1764069677332.png')
