import os
import json
from PIL import Image

def load_json(fileName):
    return json.load(open(fileName))

root_dir = "../public"
thumb_width = 300

def single_command(root_dir):
    file_list = ""
    for file in os.listdir(root_dir):
        if file.endswith(".svg"):
            file_list += " " +file

    command = "inkscape --export-type=png -w {thumb_width}"+file_list
    os.chdir(root_dir)
    os.system(command)

def command_per_file_in_dir(root_dir):
    os.chdir(root_dir)
    for file in os.listdir(root_dir):
        if file.endswith(".svg"):
            export_filename=file.replace(".svg",".thumb.png")
            command = f'inkscape --export-filename={export_filename} -w {thumb_width} "{file}"'
            os.system(command)

def command_per_file():
    file_list = load_json("../pages/slides_files.json")
    for file in file_list:
        rel_file = "../public/"+file
        export_filename=rel_file+".thumb.png"
        if file.endswith(".svg"):
            command = f'inkscape --export-filename={export_filename} -w {thumb_width} "{rel_file}"'
            os.system(command)
            dest_file = export_filename.replace(".thumb.png",".thumb")
            if(os.path.exists(dest_file)):
                os.remove(dest_file)
            os.rename(export_filename,dest_file)
        if file.endswith(".png"):
            im = Image.open(rel_file)
            im.thumbnail((thumb_width,thumb_width), Image.ANTIALIAS)
            im.save(export_filename, "PNG")


command_per_file()
