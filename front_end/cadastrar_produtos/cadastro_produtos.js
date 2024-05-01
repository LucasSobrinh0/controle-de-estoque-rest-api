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

    const form = document.getElementById('produtoForm'); // Certifique-se de que seu formulário tenha o id 'produtoForm'
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o comportamento padrão de submissão de formulários

        // Obtém os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const quantidade = document.getElementById('quantidade').value;
        const preco = document.getElementById('preco').value;
        const categoria = document.getElementById('categoria').value;

        // Cria um objeto com os dados
        const produtoData = {
            nome: nome,
            quantidade: parseInt(quantidade), // Converte quantidade para inteiro
            preco: parseFloat(preco), // Converte preço para float
            categoria: categoria
        };

        // Faz a requisição para a API usando autenticação
        fetchWithAuth('http://127.0.0.1:8000/api/criar/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produtoData)
        })
        .then(response => {
            if (!response.ok) throw new Error('Falha ao criar produto');
            return response.json();
        })
        .then(data => {
            console.log('Produto criado:', data);
            alert('Produto cadastrado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto.');
        });
    });
});


// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('produtoForm');
//     form.addEventListener('submit', function(e) {
//         e.preventDefault(); // Impede o comportamento padrão de submissão de formulários

//         // Obtém os valores dos campos do formulário
//         const nome = document.getElementById('nome').value;
//         const quantidade = document.getElementById('quantidade').value;
//         const preco = document.getElementById('preco').value;
//         const categoria = document.getElementById('categoria').value;

//         // Cria um objeto com os dados
//         const produtoData = {
//             nome: nome,
//             quantidade: parseInt(quantidade), // Converte quantidade para inteiro
//             preco: parseFloat(preco), // Converte preço para float
//             categoria: categoria
//         };

//         // Faz a requisição para a API
//         fetch('http://127.0.0.1:8000/api/criar/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(produtoData)
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Produto criado:', data);
//             alert('Produto cadastrado com sucesso!');
//         })
//         .catch(error => {
//             console.error('Erro ao cadastrar produto:', error);
//             alert('Erro ao cadastrar produto.');
//         });
//     });
// });
