#=============== CNN 
# Model evaluation
from keras.models import load_model
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns
import matplotlib.pyplot as plt

# loading model
loaded_model = load_model('tea_leaf_model.h5')

# plot confusion matrix
plt.figure(figsize=(10, 8))
sns.heatmap(
    confusion_matrix(
        y_test, [1 if value[0] > 0.5 else 0 for value in loaded_model.predict(X_test_images)]
    ), annot=True, fmt=',d'
)

print(classification_report(
        y_test, [1 if value[0] > 0.5 else 0 for value in loaded_model.predict(X_test_images)]
    ))


#================CNN+MLP
# Model evaluation
from keras.models import load_model
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns
import matplotlib.pyplot as plt

# loading model
loaded_model = load_model('tea_leaf_model_mlp+cnn.h5')

# plot confusion matrix
plt.figure(figsize=(10, 8))
sns.heatmap(
    confusion_matrix(
        y_test, [1 if value[0] > 0.5 else 0 for value in loaded_model.predict([X_test_csv, X_test_images])]
    ), annot=True, fmt=',d'
)

print(classification_report(
        y_test, [1 if value[0] > 0.5 else 0 for value in loaded_model.predict([X_test_csv, X_test_images])]
    ))

#==============CNN+MLP+VGG16
# Model evaluation
from keras.models import load_model
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns
import matplotlib.pyplot as plt

# loading model
loaded_model = load_model('tea_leaf_model_mlp+cnn+vgg16.h5')

# plot confusion matrix
plt.figure(figsize=(10, 8))
sns.heatmap(
    confusion_matrix(
        y_test, [1 if value[0] > 0.5 else 0 for value in loaded_model.predict([X_test_images, X_test_csv])]
    ), annot=True, fmt=',d'
)

print(classification_report(
        y_test, [1 if value[0] > 0.5 else 0 for value in loaded_model.predict([X_test_images, X_test_csv])]
    ))

#==============CNN+MLP+VGG16+Mobilenet
# Model evaluation
from keras.models import load_model
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns
import matplotlib.pyplot as plt

# loading model
loaded_model = load_model('tea_leaf_modelcnn+mlp+mobilenet+vgg16.h5')

# plot confusion matrix
plt.figure(figsize=(10, 8))
sns.heatmap(
    confusion_matrix(
        y_test, [1 if value[0] > 0.5 else 0 for value in loaded_model.predict([X_test_images, X_test_csv])]
    ), annot=True, fmt=',d'
)

print(classification_report(
        y_test, [1 if value[0] > 0.5 else 0 for value in loaded_model.predict([X_test_images, X_test_csv])]
    ))
