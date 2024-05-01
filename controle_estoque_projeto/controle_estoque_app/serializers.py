# controle_estoque_app/serializers.py

from rest_framework import serializers
from .models import Produtos


class ProdutosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Produtos
        fields = ('id', 'nome', 'quantidade', 'preco', 'categoria')
