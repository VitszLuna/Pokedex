const nomepoke = document.getElementById('digitepoke');

if (nomepoke) {
    function gerar() {
        const valornew = nomepoke.value.toLowerCase().trim();

        if (!valornew) {
            alert('Digite o nome de um Pokémon');
            return;
        }

        const url = `https://pokeapi.co/api/v2/pokemon/${valornew}`;

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error('Pokémon não encontrado');
                return res.json();
            })
            .then(dados => {
                window.location.href = `index1.html?pokemon=${valornew}`;
            })
            .catch(err => alert(err.message));
    }
}

// ===== Página de resultado =====
const params = new URLSearchParams(window.location.search);
const nome = params.get("pokemon");

if (nome) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        .then(res => {
            if (!res.ok) throw new Error('Pokémon não encontrado');
            return res.json();
        })
        .then(dados => {
            const nomeEl = document.getElementById("nomePokemon");
            const imgEl = document.getElementById("imagemPokemon");

            if (nomeEl) nomeEl.innerText = dados.name;
            const spriteAnimado = dados.sprites.versions["generation-v"]["black-white"].animated.front_default;
            if (imgEl) imgEl.src = spriteAnimado || dados.sprites.other["official-artwork"].front_default;
        })
        .catch(() => alert("Pokémon não encontrado!"));
}