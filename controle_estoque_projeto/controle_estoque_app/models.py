# controle_estoque_app/models.py

from django.db import models

"""Tabela de produtos"""
class Produtos(models.Model):
    nome = models.CharField(max_length=30)
    quantidade = models.IntegerField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.CharField(max_length=30)
    
    def __str__(self):
        return self.nome

    
    class Meta:
        """O python irá colocar a palavra corretamente no plural"""
        verbose_name_plural = 'Produtos'
