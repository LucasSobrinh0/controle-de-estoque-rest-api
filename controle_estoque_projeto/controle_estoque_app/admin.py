# controle_estoque_app/admin.py

from django.contrib import admin
from .models import Produtos

class ProdutosAdmin(admin.ModelAdmin):
    list_display = ('nome', 'quantidade', 'preco', 'categoria')

# Podemos utilizar a url localhost:8000/admin para administrar os produtos
admin.site.register(Produtos, ProdutosAdmin)
