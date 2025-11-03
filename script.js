// --- DADOS SIMULADOS DE GOIÂNIA (FICTÍCIOS E EXPANDIDOS) ---

// Funções utilitárias para gerar dados de exemplo (reutilizáveis e coerentes)
const BAIRROS_GO = ["Setor Bueno", "Jardim América", "Parque Flamboyant", "Setor Oeste", "Vila Redenção", "Nova Suíça", "Setor Marista", "Setor Universitário", "Campinas", "Setor Aeroporto", "Jardim Goiás", "Jardim Guanabara", "Alphaville Flamboyant"];
const PETS_NAMES = ["Bob", "Luna", "Thor", "Mel", "Zeus", "Pipoca", "Belinha", "Max", "Princesa", "Bidu", "Amora", "Rex", "Jolie", "Pingo", "Zeca", "Kika", "Floquinho", "Pandora", "Bart", "Dora", "Snoopy", "Toby"];
const RAÇAS_COMUNS = ["Labrador Retriever", "Vira-Lata (SRD)", "Pastor Alemão", "Poodle Toy", "Husky Siberiano", "Shih Tzu", "Boxer", "Basset Hound", "Chow Chow", "Dachshund (Salsicha)", "Golden Retriever", "Rottweiler", "Yorkshire Terrier", "Pug", "SRD (Gato)"];

function generateFakePet(index, tipo) {
    const nome = PETS_NAMES[index % PETS_NAMES.length];
    const raca = RAÇAS_COMUNS[Math.floor(Math.random() * RAÇAS_COMUNS.length)];
    const sexo = (index % 2 === 0) ? "Macho" : "Fêmea";
    const bairro = BAIRROS_GO[index % BAIRROS_GO.length];
    const cor = ["Dourado", "Caramelo", "Preto", "Tricolor", "Branco", "Cinza", "Tigrado"][index % 7];
    const recompensa = (index % 3 === 0) ? `R$ ${((index + 1) * 100).toFixed(2).replace('.', ',')}` : 'Não';
    const ultimaVisto = (tipo === 'perdido') ? `Há ${Math.floor(Math.random() * 5) + 1} dias` : `Hoje, ${Math.floor(Math.random() * 12) + 8}:00h`;
    const detalhes = (tipo === 'perdido') ? "Muito dócil, precisa de medicação. Ligue urgente se vir." : "Estava desorientado(a), levado para o veterinário. Procurando pelo dono.";

    return {
        id: index + 1,
        tipo: tipo,
        nome: nome,
        raca: raca,
        sexo: sexo,
        idade: `${Math.floor(Math.random() * 8) + 1} anos`,
        cor: cor,
        bairro: bairro,
        endereco: `Rua Fictícia, próximo à ${bairro}.`,
        ultimaVisto: ultimaVisto,
        recompensa: recompensa,
        contato: `(62) 98${Math.floor(Math.random() * 900) + 100}-XXXX`,
        fotoUrl: (raca.includes('Gato')) ? `https://placekitten.com/600/400?image=${index + 1}` : `https://placedog.net/600/400?random&id=${index + 1}`,
        detalhes: detalhes
    };
}

// 1. ANÚNCIOS PERDIDOS (15 exemplos para paginação)
const ANUNCIOS_PERDIDOS = Array.from({ length: 15 }, (_, i) => generateFakePet(i, "perdido"));

// 2. PETS ENCONTRADOS (9 exemplos para paginação)
const PETS_ENCONTRADOS = Array.from({ length: 9 }, (_, i) => generateFakePet(i + 100, "encontrado"));

// 3. PETS PARA ADOÇÃO (8 exemplos para paginação)
const ONGS_GO = ["SOS Patinhas Goiânia", "Adoção Goiana", "Amigos da Praça", "Cão Cuidado (GO)"];
const PETS_ADOCAO = Array.from({ length: 8 }, (_, i) => ({
    id: i + 200,
    nome: PETS_NAMES[i % PETS_NAMES.length],
    raca: RAÇAS_COMUNS[i % RAÇAS_COMUNS.length],
    idade: `${Math.floor(Math.random() * 3) + 6} meses`,
    sexo: (i % 2 === 0) ? "Macho" : "Fêmea",
    porte: ["Pequeno", "Médio", "Grande"][i % 3],
    cor: ["Preto", "Branco", "Amarelo"][i % 3],
    ong: ONGS_GO[i % ONGS_GO.length],
    fotoUrl: (i % 3 === 0) ? `https://placekitten.com/600/400?image=${i + 200}` : `https://placedog.net/600/400?random&id=${i + 200}`,
    descricao: "Este pet maravilhoso está à procura de um lar definitivo e cheio de amor em Goiânia. Já está castrado e vacinado. Por favor, adote consciente!"
}));

// 4. VAGAS DE VOLUNTARIADO (Mantido)
const VAGAS_VOLUNTARIADO = [
    {
        id: 301, ong: "Clínica Pet Amigo (Setor Marista)", funcao: "Auxiliar Veterinário (Estágio)",
        requisitos: "Estudante de Veterinária (a partir do 5º período), disponibilidade 8h/semana. Auxílio em procedimentos básicos.",
        contato: "voluntariado@clinica-pet.com"
    },
    {
        id: 302, ong: "ONG Abrace o Focinho", funcao: "Divulgador e Redes Sociais",
        requisitos: "Conhecimento em marketing digital, habilidade com criação de conteúdo (Goianês opcional). Trabalho remoto.",
        contato: "redes@abrace-focinho.org"
    },
    {
        id: 303, ong: "Abrigo Esperança (Vila Redenção)", funcao: "Passeador de Cães Voluntário",
        requisitos: "Força física, amar cães de grande porte, e ter disponibilidade nos fins de semana (manhã).",
        contato: "passeio@abrigoesperanca.com"
    }
];

// Junta todos os anúncios de busca
const TODOS_ANUNCIOS = [...ANUNCIOS_PERDIDOS, ...PETS_ENCONTRADOS];

// --- CONTROLE DE PAGINAÇÃO ---
const DISPLAY_LIMIT = 3; // Quantidade de itens a carregar por vez
let currentPerdidosIndex = 0;
let currentEncontradosIndex = 0;
let currentAdocaoIndex = 0;

// --- REFERÊNCIAS DOM ---
const gridPerdidos = document.getElementById('announcement-grid-perdidos');
const gridEncontrados = document.getElementById('announcement-grid-encontrados');
const gridAdocao = document.getElementById('adoption-grid');
const gridVoluntario = document.getElementById('volunteer-grid');
const filterInput = document.getElementById('filter-input');
const modal = document.getElementById('pet-details-modal');
const modalContent = document.getElementById('modal-body-content');
const btnLoadPerdidos = document.getElementById('btn-load-perdidos');
const btnLoadEncontrados = document.getElementById('btn-load-encontrados');
const btnLoadAdocao = document.getElementById('btn-load-adocao');


// --- FUNÇÕES DE RENDERIZAÇÃO E PAGINAÇÃO ---

/**
 * Cria o HTML para o card de Anúncio (Perdido/Encontrado).
 */
function generateAnnouncementCardHTML(pet) {
    const isPerdido = pet.tipo === 'perdido';
    const badgeClass = isPerdido ? 'badge-perdido' : 'badge-encontrado';
    const badgeText = isPerdido ? 'PERDIDO' : 'ENCONTRADO';
    const recompensaBadge = pet.recompensa && pet.recompensa !== 'Não' ?
        `<span class="badge badge-recompensa"><i class="fas fa-hand-holding-usd"></i> ${pet.recompensa}</span>` : '';

    return `
        <article class="announcement-card" data-id="${pet.id}" data-type="${pet.tipo}" onclick="openPetDetails(${pet.id}, '${pet.tipo}')">
            <img src="${pet.fotoUrl}" alt="Foto do ${pet.nome}, um(a) ${pet.raca}" class="pet-photo" loading="lazy">
            <div class="card-content">
                <h3>${pet.nome} <span class="badge ${badgeClass}">${badgeText}</span></h3>
                <div class="card-info">
                    <p><strong><i class="fas fa-venus-mars"></i> Sexo:</strong> ${pet.sexo}</p>
                    <p><strong><i class="fas fa-map-marker-alt"></i> Bairro:</strong> ${pet.bairro}</p>
                    <p><strong><i class="far fa-clock"></i> Última Vez:</strong> ${pet.ultimaVisto}</p>
                </div>
                <div class="card-badges">
                    ${recompensaBadge}
                    <span class="badge" style="background-color: #f1f1f1; color: var(--color-text);"><i class="fas fa-dog"></i> ${pet.raca}</span>
                </div>
            </div>
        </article>
    `;
}

/**
 * Cria o HTML para o card de Adoção.
 */
function generateAdoptionCardHTML(pet) {
    return `
        <div class="adoption-card">
            <img src="${pet.fotoUrl}" alt="Foto do ${pet.nome}" loading="lazy">
            <div class="card-content">
                <h3>${pet.nome} (${pet.sexo})</h3>
                <p><strong><i class="fas fa-dog"></i> Raça:</strong> ${pet.raca}</p>
                <p><strong><i class="fas fa-birthday-cake"></i> Idade:</strong> ${pet.idade}</p>
                <p><strong><i class="fas fa-city"></i> ONG:</strong> ${pet.ong}</p>
                <p class="description">${pet.descricao.substring(0, 80)}...</p>
                <a href="#" class="btn-primary-cta" style="margin-top: 10px; padding: 8px 15px; font-size: 0.9em;"><i class="fas fa-external-link-alt"></i> Quero Adotar</a>
            </div>
        </div>
    `;
}

/**
 * Cria o HTML para o card de Voluntariado.
 */
function generateVolunteerCardHTML(vaga) {
    return `
        <div class="volunteer-card">
            <h3><i class="fas fa-briefcase"></i> ${vaga.funcao}</h3>
            <p><strong><i class="fas fa-city"></i> ONG/Local:</strong> ${vaga.ong}</p>
            <p><strong><i class="fas fa-clipboard-list"></i> Requisitos:</strong> ${vaga.requisitos}</p>
            <a href="mailto:${vaga.contato}" class="btn-filter" style="margin-top: 15px; padding: 8px 15px; background-color: #00bcd4;"><i class="fas fa-envelope"></i> Contato</a>
        </div>
    `;
}

/**
 * Função principal para carregar mais anúncios com paginação.
 * @param {string} type - 'perdidos', 'encontrados', ou 'adocao'.
 * @param {boolean} isInitial - Indica se é a carga inicial (limpa o grid).
 */
function loadMoreAnnouncements(type, isInitial = false) {
    let dataArray, currentIndex, gridElement, loadButton, generatorFn;

    switch (type) {
        case 'perdidos':
            dataArray = ANUNCIOS_PERDIDOS;
            currentIndex = currentPerdidosIndex;
            gridElement = gridPerdidos;
            loadButton = btnLoadPerdidos;
            generatorFn = generateAnnouncementCardHTML;
            break;
        case 'encontrados':
            dataArray = PETS_ENCONTRADOS;
            currentIndex = currentEncontradosIndex;
            gridElement = gridEncontrados;
            loadButton = btnLoadEncontrados;
            generatorFn = generateAnnouncementCardHTML;
            break;
        case 'adocao':
            dataArray = PETS_ADOCAO;
            currentIndex = currentAdocaoIndex;
            gridElement = gridAdocao;
            loadButton = btnLoadAdocao;
            generatorFn = generateAdoptionCardHTML;
            break;
        default:
            return;
    }

    if (isInitial) {
        // Renderiza apenas os primeiros 3 ou até o limite
        gridElement.innerHTML = '';
        currentIndex = 0;
    }

    const nextBatch = dataArray.slice(currentIndex, currentIndex + DISPLAY_LIMIT);

    nextBatch.forEach(pet => {
        gridElement.innerHTML += generatorFn(pet);
    });

    // Atualiza o índice
    const newIndex = currentIndex + nextBatch.length;
    
    switch (type) {
        case 'perdidos': currentPerdidosIndex = newIndex; break;
        case 'encontrados': currentEncontradosIndex = newIndex; break;
        case 'adocao': currentAdocaoIndex = newIndex; break;
    }

    // Esconde o botão se todos os itens foram carregados
    if (newIndex >= dataArray.length) {
        loadButton.style.display = 'none';
    } else {
        loadButton.style.display = 'block';
        loadButton.innerHTML = `Carregar Mais ${Math.min(DISPLAY_LIMIT, dataArray.length - newIndex)} Alertas <i class="fas fa-chevron-down"></i>`;
    }
}

/**
 * Renderiza todas as seções iniciais.
 */
function renderAllSectionsInitial() {
    // 1. Perdidos (Primeira carga)
    loadMoreAnnouncements('perdidos', true);
    
    // 2. Encontrados (Primeira carga)
    loadMoreAnnouncements('encontrados', true);

    // 3. Adoção (Primeira carga)
    loadMoreAnnouncements('adocao', true);

    // 4. Voluntariado (Carga completa, sem paginação)
    gridVoluntario.innerHTML = VAGAS_VOLUNTARIADO.map(generateVolunteerCardHTML).join('');

    // 5. Histórias de Sucesso
    renderTestimonials();
}

// --- FUNÇÃO DE FILTRO (AGORA COMPLETA) ---

function filterAnnouncements() {
    const input = filterInput.value.toLowerCase().trim();
    
    if (input.length < 2 && input.length > 0) {
        alert("Digite pelo menos 2 caracteres para refinar a busca.");
        return;
    }
    
    // Filtra no array completo
    const filteredList = TODOS_ANUNCIOS.filter(pet => 
        pet.nome.toLowerCase().includes(input) || 
        pet.bairro.toLowerCase().includes(input) ||
        pet.raca.toLowerCase().includes(input) ||
        pet.cor.toLowerCase().includes(input) ||
        pet.detalhes.toLowerCase().includes(input)
    );
    
    // Limpa e esconde botões de "Carregar Mais" durante o filtro
    gridPerdidos.innerHTML = '';
    gridEncontrados.innerHTML = '';
    btnLoadPerdidos.style.display = 'none';
    btnLoadEncontrados.style.display = 'none';

    if (filteredList.length === 0) {
        gridPerdidos.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-size: 1.5em; color: var(--color-alert); padding: 30px 0;">Nenhum anúncio correspondente foi encontrado para esta busca.</p>';
    } else {
        const perdidos = filteredList.filter(p => p.tipo === 'perdido');
        const encontrados = filteredList.filter(p => p.tipo === 'encontrado');

        if (perdidos.length > 0) {
             gridPerdidos.innerHTML = perdidos.map(generateAnnouncementCardHTML).join('');
        } else {
             gridPerdidos.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #777;">Nenhum Pet *Perdido* encontrado para o filtro.</p>';
        }

        if (encontrados.length > 0) {
             gridEncontrados.innerHTML = encontrados.map(generateAnnouncementCardHTML).join('');
        } else {
             gridEncontrados.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #777;">Nenhum Pet *Encontrado* encontrado para o filtro.</p>';
        }
    }
}

function resetFilters() {
    filterInput.value = '';
    // Reseta os índices e renderiza a seção inicial paginada novamente
    currentPerdidosIndex = 0;
    currentEncontradosIndex = 0;
    currentAdocaoIndex = 0;
    renderAllSectionsInitial();
}


// --- ANIMAÇÃO DE NÚMEROS (Melhoria CSS/JS) ---

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let currentValue = Math.floor(progress * (end - start) + start);
        
        // Formata como porcentagem ou número
        obj.innerHTML = (obj.getAttribute('data-target').includes('%')) 
                        ? `${currentValue}%` 
                        : `${currentValue}+`;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
             obj.innerHTML = obj.getAttribute('data-target'); // Garante o valor final exato
        }
    };
    window.requestAnimationFrame(step);
}


// --- HISTÓRIAS DE SUCESSO E MODAL (Mantido e Refinado) ---

function renderTestimonials() {
    const testimonialData = [
        // Adicionadas mais histórias para maior credibilidade
        { avatar: "https://i.pravatar.cc/150?img=11", autor: "Dona Maria (Setor Oeste)", pet: "Mingau (Gato)", texto: "Nunca pensei que encontraria meu gato, Mingau, depois de 3 dias. A rede de voluntários foi essencial! Gratidão eterna!" },
        { avatar: "https://i.pravatar.cc/150?img=12", autor: "João Silva (Jardim América)", pet: "Max (Basset)", texto: "O site me ajudou a identificar o dono do Basset Hound que encontrei na rua. Em 2 horas, ele estava em casa. Trabalho incrível!" },
        { avatar: "https://i.pravatar.cc/150?img=13", autor: "Família Costa (Vila Redenção)", pet: "Belinha (Vira-Lata)", texto: "Graças ao alerta de recompensa, Belinha foi vista e resgatada na mesma noite. Vocês trouxeram a alegria de volta para nossa casa!" },
        { avatar: "https://i.pravatar.cc/150?img=14", autor: "Voluntário Pedro", pet: "Cão idoso", texto: "Consegui resgatar um cão idoso desorientado perto do Mutirão. Usando o banco de dados, o dono foi localizado em 3 horas. Missão cumprida!" }
    ];

    const carousel = document.getElementById('testimonial-carousel');
    carousel.innerHTML = testimonialData.map(test => `
        <div class="testimonial-card">
            <img src="${test.avatar}" alt="Foto do depoente" class="test-avatar" loading="lazy">
            <p class="testimonial-text">"${test.texto}"</p>
            <p class="testimonial-author">- ${test.autor}</p>
            <p class="pet-status">Reencontrado: ${test.pet}</p>
        </div>
    `).join('');
}

function openPetDetails(petId, petType) {
    const sourceArray = petType === 'perdido' ? ANUNCIOS_PERDIDOS : PETS_ENCONTRADOS;
    const pet = sourceArray.find(p => p.id === petId);
    if (!pet) return;

    const badgeStyle = petType === 'perdido' ? 'color: var(--color-alert);' : 'color: var(--color-found);';
    const contatoButtonClass = petType === 'perdido' ? 'btn-contact-modal' : 'btn-primary-cta';

    modalContent.innerHTML = `
        <img src="${pet.fotoUrl}" alt="Foto de ${pet.nome}" class="modal-img">
        <h3>${pet.nome} <span style="font-size: 0.7em; ${badgeStyle}"> (${petType.toUpperCase()})</span></h3>
        <p style="font-weight: 500; margin-bottom: 20px;"><strong><i class="fas fa-info-circle"></i> Detalhes Adicionais:</strong> ${pet.detalhes}</p>
        
        <div class="modal-info-group">
            <div><strong><i class="fas fa-dog"></i> Raça:</strong> ${pet.raca}</div>
            <div><strong><i class="fas fa-paint-brush"></i> Cor:</strong> ${pet.cor}</div>
            <div><strong><i class="fas fa-venus-mars"></i> Sexo/Idade:</strong> ${pet.sexo}, ${pet.idade}</div>
            <div><strong><i class="fas fa-hand-holding-usd"></i> Recompensa:</strong> ${pet.recompensa}</div>
        </div>

        <div class="modal-info-group">
            <div style="grid-column: 1 / -1;"><strong><i class="fas fa-map-marked-alt"></i> Último Visto/Encontrado:</strong> ${pet.bairro} (${pet.endereco})</div>
            <div style="grid-column: 1 / -1;"><strong><i class="far fa-clock"></i> Data/Hora:</strong> ${pet.ultimaVisto}</div>
        </div>
        
        <a href="tel:${pet.contato}" class="${contatoButtonClass}"> <i class="fas fa-phone"></i> Contato Urgente: ${pet.contato}</a>
    `;

    modal.style.display = "block";
    document.body.style.overflow = 'hidden';
}

function closePetDetails() {
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
}

// --- INICIALIZAÇÃO E LISTENERS ---

// Event Listeners para o Modal (Fechamento)
window.onclick = function(event) {
    if (event.target == modal) {
        closePetDetails();
    }
}

// Inicialização: Renderiza todo o conteúdo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderAllSectionsInitial();

    // Adiciona evento de tecla Enter no input de filtro
    filterInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterAnnouncements();
        }
    });

    // Animação dos números de estatística
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = stat.getAttribute('data-target').replace(/[^0-9]/g, '');
        animateValue(stat, 0, parseInt(target), 2000);
    });
});