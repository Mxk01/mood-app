from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import serializers
from rest_framework.views import View
from ...models import ImageModel

from django.core.files.base import ContentFile

#data needs to be serialzed to consistent JSON 


@api_view(['GET', 'POST'])
def connectFrontEnd(request: Request):
   
    if request.method == 'GET':
        return Response()
    if request.method == 'POST':
       # Assuming the image data is sent as JSON in the request body
        data = request.data

        # Assuming the image data is directly provided in the 'image' field
        image_data = data.get('image', None)

        if image_data:
            # Create a ContentFile from the provided image data
            image_file = ContentFile(image_data.read(), name='photo.jpg')

            # Create an instance of ImageModel
            image_model = ImageModel(image=image_file)

            # Save the instance to the database
            image_model.save()

            return Response({'message': 'Image saved successfully!'}, status=201)
        else:
            return Response({'error': 'No image data provided'}, status=400)
    
