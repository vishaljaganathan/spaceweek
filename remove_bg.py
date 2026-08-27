from PIL import Image, ImageDraw

def remove_black_bg(input_path, output_path, tolerance=15):
    img = Image.open(input_path).convert("RGBA")
    
    # We will use flood fill to change the black background to a key color (e.g. magenta)
    key_color = (255, 0, 255, 255)
    
    # Create a temporary image for flood fill (needs to be RGB)
    temp_img = img.convert("RGB")
    
    # Flood fill from top-left (0, 0) - assuming the corner is background
    ImageDraw.floodfill(temp_img, (0, 0), (255, 0, 255), thresh=tolerance)
    
    # Now combine the alpha channel
    datas = img.getdata()
    temp_datas = temp_img.getdata()
    
    new_data = []
    for i, item in enumerate(temp_datas):
        if item == (255, 0, 255):
            # It was filled, make it transparent
            new_data.append((255, 255, 255, 0))
        else:
            # Keep original pixel
            new_data.append(datas[i])
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    files = ['shuttle_orbiter', 'shuttle_tank', 'shuttle_srb']
    for f in files:
        try:
            remove_black_bg(f'assets/{f}.jpg', f'assets/{f}.png', tolerance=15)
            print(f"Processed {f}")
        except Exception as e:
            print(f"Error processing {f}: {e}")
