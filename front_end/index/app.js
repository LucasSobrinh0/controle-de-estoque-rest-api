document.addEventListener('DOMContentLoaded', function() {
    function carregarProdutos() {
        fetchWithAuth('http://127.0.0.1:8000/api/listar/')
        .then(response => {
            if (!response.ok) throw new Error('Falha na requisição');
            return response.json();
        })
        .then(data => {
            exibirProdutos(data);
        })
        .catch(error => {
            console.error('Erro ao acessar API:', error);
        });
    }

    function exibirProdutos(produtos) {
        const lista = document.getElementById('lista-produtos');
        lista.innerHTML = '';

        produtos.forEach(produto => {
            const item = document.createElement('li');
            item.classList.add('produto-item');

            item.innerHTML = `
                <div class="detalhes">
                    <span><strong>Nome:</strong> ${produto.nome}</span>
                    <span><strong>Quantidade:</strong> ${produto.quantidade}</span>
                    <span><strong>Preço:</strong> R$ ${produto.preco}</span>
                    <span><strong>Categoria:</strong> ${produto.categoria}</span>
                </div>
                <div class="acoes">
                    <button class="editar">Editar</button>
                    <button class="remover">Remover</button>
                </div>
            `;
            lista.appendChild(item);

            // Edit button handler
            item.querySelector('.editar').onclick = () => {
                window.location.href = `editar_produtos.html?id=${produto.id}`;
            };

            // Remove button handler
            item.querySelector('.remover').onclick = () => {
                if (confirm('Tem certeza que deseja remover este produto?')) {
                    fetchWithAuth(`http://127.0.0.1:8000/api/deletar/${produto.id}/`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.ok) {
                            item.remove();  // Remove the item from the frontend if successful
                        } else {
                            alert('Falha ao remover o produto.');
                        }
                    })
                    .catch(error => console.error('Erro ao remover produto:', error));
                }
            };
        });
    }

    carregarProdutos();
});


// document.addEventListener('DOMContentLoaded', function() {
//     function carregarProdutos() {
//         fetch('http://127.0.0.1:8000/api/listar/')
//             .then(response => response.json())
//             .then(data => {
//                 exibirProdutos(data);
//             })
//             .catch(error => console.error('Falha ao buscar produtos:', error));
//     }

//     function exibirProdutos(produtos) {
//         const lista = document.getElementById('lista-produtos');
//         lista.innerHTML = '';

//         produtos.forEach(produto => {
//             const item = document.createElement('li');
//             item.classList.add('produto-item');

//             item.innerHTML = `
//                 <div class="detalhes">
//                     <span><strong>Nome:</strong> ${produto.nome}</span>
//                     <span><strong>Quantidade:</strong> ${produto.quantidade}</span>
//                     <span><strong>Preço:</strong> R$ ${produto.preco}</span>
//                     <span><strong>Categoria:</strong> ${produto.categoria}</span>
//                 </div>
//                 <div class="acoes">
//                     <button class="editar">Editar</button>
//                     <button class="remover">Remover</button>
//                 </div>
//             `;
//             lista.appendChild(item);

//             // Event handler for the edit button
//             const editButton = item.querySelector('.editar');
//             editButton.onclick = function() {
//                 window.location.href = `editar_produtos.html?id=${produto.id}`;
//             };

//             // Event handler for the remove button
//             const removeButton = item.querySelector('.remover');
//             removeButton.onclick = function() {
//                 if (confirm('Tem certeza que deseja remover este produto?')) { // Confirmation dialog
//                     fetch(`http://127.0.0.1:8000/api/deletar/${produto.id}/`, {
//                         method: 'DELETE'
//                     })
//                     .then(response => {
//                         if (response.ok) {
//                             item.remove(); // Remove the item from the frontend if the deletion was successful
//                         } else {
//                             alert('Falha ao remover o produto.');
//                         }
//                     })
//                     .catch(error => console.error('Erro ao remover produto:', error));
//                 }
//             };
//         });
//     }

//     carregarProdutos();
// });
