const nomepoke = document.getElementById('digitepoke');

// Função de busca (index.html)
function gerar() {
    if (!nomepoke) return;
    const valornew = nomepoke.value.toLowerCase().trim();

    if (!valornew) {
        alert('Digite o nome de um Pokémon');
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${valornew}`)
        .then(res => {
            if (!res.ok) throw new Error('Pokémon não encontrado');
            return res.json();
        })
        .then(() => {
            window.location.href = `index1.html?pokemon=${valornew}`;
        })
        .catch(err => alert(err.message));
}

// Lógica de exibição (index1.html)
const params = new URLSearchParams(window.location.search);
const pokemonNome = params.get("pokemon");

if (pokemonNome) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNome}`)
        .then(res => res.json())
        .then(dados => {
            const nomeEl = document.getElementById("nomePokemon");
            const imgEl = document.getElementById("imagemPokemon");
            const pesoEl = document.getElementById("pesoPokemon");
            const alturaEl = document.getElementById("alturaPokemon");

            if (nomeEl) nomeEl.innerText = dados.name;
            if (pesoEl) pesoEl.innerText = `PESO: ${dados.weight / 10} KG`;
            if (alturaEl) alturaEl.innerText = `ALTURA: ${dados.height / 10} M`;

            const sprite = dados.sprites.versions["generation-v"]["black-white"].animated.front_default;
            if (imgEl) imgEl.src = sprite || dados.sprites.other["official-artwork"].front_default;
        })
        .catch(err => console.error("Erro:", err));
}
