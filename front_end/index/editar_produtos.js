document.addEventListener('DOMContentLoaded', function() {
    fetchWithAuth('http://127.0.0.1:8000/api/listar/')
    .then(response => {
        if (!response.ok) throw new Error('Falha na requisição');
        return response.json();
    })
    .then(data => {
        console.log(data);
        // Processar e exibir dados
    })
    .catch(error => {
        console.error('Erro ao acessar API:', error);
    });

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    // Carrega os dados do produto
    function carregarDadosProduto() {
        fetchWithAuth(`http://127.0.0.1:8000/api/editar/${productId}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Falha na resposta da API: ${response.statusText}`);
            }
            return response.json();
        })
        .then(produto => {
            document.getElementById('nome').value = produto.nome;
            document.getElementById('quantidade').value = produto.quantidade;
            document.getElementById('preco').value = produto.preco;
            document.getElementById('categoria').value = produto.categoria;
        })
        .catch(error => console.error('Erro ao carregar dados do produto:', error));
    }

    // Evento de submissão do formulário
    document.getElementById('editForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const produtoData = {
            nome: document.getElementById('nome').value,
            quantidade: parseInt(document.getElementById('quantidade').value, 10),
            preco: parseFloat(document.getElementById('preco').value),
            categoria: document.getElementById('categoria').value
        };

        fetchWithAuth(`http://127.0.0.1:8000/api/editar/${productId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produtoData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Produto atualizado:', data);
            alert('Produto atualizado com sucesso!');
        })
        .catch(error => console.error('Erro ao atualizar produto:', error));
    });

    // Carregar dados quando a página for carregada
    carregarDadosProduto();
});


// document.addEventListener('DOMContentLoaded', function() {
//     const params = new URLSearchParams(window.location.search);
//     const productId = params.get('id');

//     // Carrega os dados do produto
//     function carregarDadosProduto() {
//         fetch(`http://127.0.0.1:8000/api/editar/${productId}/`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Falha na resposta da API: ${response.statusText}`);
//             }
//             return response.json();
//         })
//         .then(produto => {
//             document.getElementById('nome').value = produto.nome;
//             document.getElementById('quantidade').value = produto.quantidade;
//             document.getElementById('preco').value = produto.preco;
//             document.getElementById('categoria').value = produto.categoria;
//         })
//         .catch(error => console.error('Erro ao carregar dados do produto:', error));
//     }

//     // Evento de submissão do formulário
//     document.getElementById('editForm').addEventListener('submit', function(e) {
//         e.preventDefault();

//         const produtoData = {
//             nome: document.getElementById('nome').value,
//             quantidade: parseInt(document.getElementById('quantidade').value, 10),
//             preco: parseFloat(document.getElementById('preco').value),
//             categoria: document.getElementById('categoria').value
//         };

//         fetch(`http://127.0.0.1:8000/api/editar/${productId}/`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(produtoData)
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Produto atualizado:', data);
//             alert('Produto atualizado com sucesso!');
//         })
//         .catch(error => console.error('Erro ao atualizar produto:', error));
//     });

//     // Carregar dados quando a página for carregada
//     carregarDadosProduto();
// });
