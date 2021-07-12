import os
import sys
from PIL import Image

# WARNING I HAVEN'T TESTED THIS ON MANY DIFFERENT IMAGES SO USE AT YOUR OWN
# RISK! PLEASE LET ME KNOW IF SOMETHING NEEDS TO BE FIXED.

# Default dimensions in inches
defaults = [(14, 11), (12, 12), (18, 12), (20, 8),
            (20, 16), (30, 20), (36, 24)]


def create_img_dims(source: str, desination="", dimensions=defaults, dpi=300):
    """
    Creates copies of differing dimensions for given source image and stores them in a specifed
    destination.
    Arguments:
        source = file or absolute file path
        destination = a path specifying where to save the copies
            DEFAULT: source location
        dimensions = list of tuples holding W x L dimensions in inches
            DEFAULT: predefined sizes
        dpi = number of pixels per inch
            DEFAULT: 300
    """

    # This finds the file path and verifies that the save destination directory exists.
    # If it doesn't exist then it saves to the same directory as the source.
    file_path = source.rsplit('/', 1)
    file_name = source.rsplit('/', 1)[1]
    if desination:
        try:
            os.chdir(desination)
        except PathError:
            print("ERROR: Couldn't find/create destination path.")
            return False
    elif len(file_path) > 1:
        os.chdir(file_path[0])
        file_name = file_path[1]
    else:
        file_name = source

    file_name = file_name.split('.')

    # Opens the image to process
    im = Image.open(source)

    # The smallest dimension of the the given image will typically be the bottleneck
    # if the new dimensions proportions are smaller than the original. This puts the
    # typical bottleneck dimension as the first var in originals for the sake of less
    # if statements. However, if the new dimensions proportions are a bigger in the
    # non typical dimension the code will switch to grow according to that dimension
    # and crop the opposite.
    original = (im.width, im.height) if im.height < im.width else (
        im.height, im.width)

    # Creates copies of the given image in the dimensions specified in sizes
    for x, y in dimensions:

        # Desired pixels an inch for the given dimension in inches
        desired = (dpi * x, dpi * y)

        # Calcualtes the aspect ratio
        a = original[0] / original[1]
        new_v = round(a * desired[1])

        # Here is where it's decided which dimension will be cropped according to
        # what the proportion of the desired dimensions are.

        # If the new size of non typical dimension falls short of the desired pixels,
        # it will switch which dimension is the focus for the resize. A flag will be
        # set to swap which dimension is getting cropped.
        if new_v < desired[0]:
            a = original[1] / original[0]
            new_v = round(a * desired[0])
            # Decides which tuple is neccessary depending on W x L or L x W
            proportions = (desired[0], new_v) if im.height < im.width else (
                new_v, desired[0])
            b = round((new_v - desired[1]) / 2)
            flag = True
        else:
            # Decides which tuple is neccessary depending on W x L or L x W
            proportions = (new_v, desired[1]) if im.height < im.width else (
                desired[1], new_v)
            b = round((new_v - desired[0]) / 2)
            flag = False

        try:
            resized = im.resize(proportions, resample=Image.NEAREST)
        except ResizeError:
            print("ERROR: Something went wrong while trying to resize.")
            return False

        # Crops the image on both sides of necessary dimension
        try:
            if im.height < im.width:
                # Cropping for images that are initially wider than they are tall
                if flag:  # If flag is set crop height instead of width
                    cropped = resized.crop((0, b, desired[0], new_v - b, ))
                else:
                    cropped = resized.crop((b, 0, new_v - b, desired[1]))
                cropped.save(f'{file_name[0]}_{x}x{y}.{file_name[1]}')
            else:
                # Cropping for images that are initially taller than they are wide
                if flag:  # If flag is set crop width instead of height
                    cropped = resized.crop((b, 0, new_v - b, desired[0]))
                else:
                    cropped = resized.crop((0, b, desired[1], new_v - b))
                cropped.save(f'{file_name[0]}_{y}x{x}.{file_name[1]}')
        except CropError:
            print("ERROR: Something went wrong while try to crop.")
            return False
    return True


if __name__ == "__main__":

    dims = defaults
    dpi = 300
    dest = ""
    src = ""

    for i in range(1, len(sys.argv)):
        if i == 1:
            src = sys.argv[1]
        if i == 2:
            dest = sys.argv[2]
        if i == 3:
            dims = sys.argv[3]
        if i == 4:
            dpi = sys.argv[4]

    print(src)
    if src == "":
        exit(1)

    response = create_img_dims(src, dest, dims, dpi)
    print(response)
    if response:
        exit(0)
    else:
        exit(1)
