from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import cv2

lables = ["door","front_bumper","Glass","hood","rear_bumper","head_light","tail_light"]

def predict_video(path_to_video : str, path_to_model: str = "keras_model.h5"):
    model = load_model(path_to_model)
    classifications_list = []
    # dammage_scores = []
    cap = cv2.VideoCapture(path_to_video)
    count = 0
    while cap.isOpened():
        try:
            ret,frame = cap.read()
            if ret and count < 30:
                count+=1
                print(count)
                frame_classifier = cv2.resize(frame, (224, 224))
                frame_classifier = np.expand_dims(frame_classifier, axis=0)
                classification_results = model.predict(frame_classifier)
                # print(classification_results)
                for index,i in enumerate(classification_results[0]):
                    if int(i*100) > 5 and index!= len(lables) -1:
                        if lables[index] not in classifications_list:
                            classifications_list.append(lables[index])
            else:
                break
        except:
            pass
    return classifications_list



data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
# Replace this with the path to your image
image = Image.open('<IMAGE_PATH>')
#resize the image to a 224x224 with the same strategy as in TM2:
#resizing the image to be at least 224x224 and then cropping from the center
size = (224, 224)
image = ImageOps.fit(image, size, Image.ANTIALIAS)

#turn the image into a numpy array
image_array = np.asarray(image)
# Normalize the image
normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
# Load the image into the array
data[0] = normalized_image_array

# run the inference
prediction = model.predict(data)
print(prediction)
