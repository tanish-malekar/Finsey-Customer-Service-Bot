import io
import os
from PIL import Image
import streamlit as st
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import cv2

lables = ["door","front_bumper","Glass","hood","rear_bumper","head_light","tail_light"]


def load_image():
    uploaded_file = st.file_uploader(label='Pick an Video to test')
    # if uploaded_file is not None:
    #     image_data = uploaded_file.getvalue()
    #     st.image(image_data)
    #     return Image.open(io.BytesIO(image_data))
    # else:
    #     return None


def predict_video(path_to_video : str = "car_crash_video.mp4", path_to_model: str = "keras_model.h5"):
    model = load_model(path_to_model)
    classifications_list = []
    # dammage_scores = []
    cap = cv2.VideoCapture(path_to_video)
    count = 0
    while cap.isOpened():
        try:
            ret,frame = cap.read()
            if ret and count < 30:

                frame_classifier = cv2.resize(frame, (224, 224))
                frame_classifier = np.expand_dims(frame_classifier, axis=0)
                classification_results = model.predict(frame_classifier)
                # print(classification_results[0])
                # int_results = [int(mn*100) for mn in classification_results[0]]
                # print(int_results)
                for index,i in enumerate(classification_results[0]):
                    if int(i*100) > 5:
                        if lables[index] not in classifications_list:
                            classifications_list.append(lables[index])
            else:
                break
        except:
            pass
    return classifications_list

def main():
    st.title('odel demo')
    image = load_image()
    image = np.array(image)
    print(type(image))
    result = st.button('Run on Video')
    if result:
        st.write('Calculating results...')
        st.write(predict_video())


if __name__ == '__main__':
    main()