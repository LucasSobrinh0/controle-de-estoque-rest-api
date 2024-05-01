# controle_estoque_app/urls.py

from django.urls import path
from .views import ListarProdutos, CriarProdutos, EditarProdutos, DeletarProdutos

urlpatterns = [
    path('listar/', ListarProdutos.as_view()), # Caminho para listar produtos
    path('criar/', CriarProdutos.as_view()), # Caminho para criar produtos
    path('editar/<int:pk>/', EditarProdutos.as_view()), # Caminho para editar produtos
    path('deletar/<int:pk>/', DeletarProdutos.as_view()), # Caminho para deletar produtos
]
