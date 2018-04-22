class GCSSettings(object):

    CAMERA_NORTH_OFFSET = 20

    UAV_CONNECTION_STRING = "tcp:127.0.0.1:14551"

    INTEROP_URL = "http://10.10.130.103:8000"
    INTEROP_USERNAME = "Flint"   #"img_proc_test"
    INTEROP_PASSWORD = "271824758" #robotics

    MSL_ALT = 22#446.42
    SDA_MIN_ALT = 50

    GENERATED_DATA_LOCATION = "image_data"
    '''
    BASE_LETTER_CATEGORIZER_PCA_PATH
    Vale's path: /Users/vtolpegin/Desktop/GENERATED FORCED WINDOW PCA
    '''
    VALE_BASE_LETTER_CATEGORIZER_PATH = "/Users/vtolpegin/Desktop/GENERATED FORCED WINDOW PCA"
    BASE_LETTER_CATEGORIZER_PCA_PATH = VALE_BASE_LETTER_CATEGORIZER_PATH
    '''
    BASE_ORIENTATION_CLASSIFIER_PCA_PATH:
    Vale's path: /Users/vtolpegin/Desktop/GENERATED 180 ORIENTATION PCA
    '''
    VALE_BASE_ORIENTATION_CLASSIFIER_PCA_PATH = "/Users/vtolpegin/Desktop/GENERATED 180 ORIENTATION PCA"
    BASE_ORIENTATION_CLASSIFIER_PCA_PATH = VALE_BASE_ORIENTATION_CLASSIFIER_PCA_PATH

    SD_CARD_NAME = "GoPro"

    MIN_DIST_BETWEEN_TARGETS_KM = 30.0/1000.0
    KNOTS_PER_METERS_PER_SECOND = 1.94384448

    IMAGE_PROC_PPSI = 1.5
