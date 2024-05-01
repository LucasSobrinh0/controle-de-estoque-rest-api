# controle_estoque_app/views.py

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly
from .serializers import ProdutosSerializers
from .models import Produtos

class BaseProductView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]  # Apenas usuários autenticados e administradores podem acessar
    queryset = Produtos.objects.all()
    serializer_class = ProdutosSerializers

class ListarProdutos(BaseProductView, generics.ListAPIView):
    pass

class CriarProdutos(BaseProductView, generics.CreateAPIView):
    pass

class EditarProdutos(BaseProductView, generics.RetrieveUpdateAPIView):
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

class DeletarProdutos(BaseProductView, generics.DestroyAPIView):
    pass

