// --- DADOS SIMULADOS DE GOIÂNIA (FICTÍCIOS) ---

// 1. ANIMAIS PERDIDOS
const ANUNCIOS_PERDIDOS = [
    {
        id: 1, tipo: "perdido", nome: "Bob", raca: "Labrador Retriever", sexo: "Macho", idade: "5 anos", cor: "Dourado",
        bairro: "Setor Bueno", endereco: "Próximo à Praça da T-25.",
        ultimaVisto: "Ontem, 19:30h", recompensa: "R$ 500,00",
        contato: "(62) 98111-XXXX", fotoUrl: "https://placedog.net/600/400?random&id=1",
        detalhes: "Muito dócil, atende por 'Bobão'. Tem coleira vermelha com plaquinha. Urgente!"
    },
    {
        id: 2, tipo: "perdido", nome: "Luna", raca: "Vira-Lata (SRD)", sexo: "Fêmea", idade: "2 anos", cor: "Caramelo",
        bairro: "Jardim América", endereco: "Rua C-156, perto do Supermercado.",
        ultimaVisto: "Hoje, 07:00h", recompensa: "Não",
        contato: "(62) 98222-XXXX", fotoUrl: "https://placedog.net/600/400?random&id=2",
        detalhes: "Castrada, muito medrosa. Se abaixar e chamar pelo nome, ela se aproxima."
    },
    {
        id: 3, tipo: "perdido", nome: "Thor", raca: "Pastor Alemão", sexo: "Macho", idade: "8 meses", cor: "Preto e Marrom",
        bairro: "Parque Flamboyant", endereco: "Avenida Jamel Cecílio, fugiu durante passeio.",
        ultimaVisto: "Há 2 dias, 15:00h", recompensa: "R$ 1.000,00",
        contato: "(62) 98333-XXXX", fotoUrl: "https://placedog.net/600/400?random&id=3",
        detalhes: "Filhote brincalhão. Pode estar assustado. Não tem microchip. "
    }
];

// 2. PETS ENCONTRADOS
const PETS_ENCONTRADOS = [
    {
        id: 101, tipo: "encontrado", nome: "Sem Nome", raca: "Cocker Spaniel", sexo: "Fêmea", idade: "Aprox. 3 anos", cor: "Preto",
        bairro: "Setor Oeste", endereco: "Encontrada na Praça Tamandaré, muito assustada.",
        ultimaVisto: "Hoje, 10:00h", recompensa: "Não",
        contato: "(62) 99111-XXXX", fotoUrl: "https://placedog.net/600/400?random&id=101",
        detalhes: "Tem coleira azul e está com sinais de desnutrição leve. Necessário comprovante de posse para resgate."
    },
    {
        id: 102, tipo: "encontrado", nome: "Sem Nome", raca: "Gato SRD", sexo: "Macho", idade: "Aprox. 1 ano", cor: "Branco e Laranja",
        bairro: "Vila Nova", endereco: "Achei perto do Hospital Geral de Goiânia (HGG).",
        ultimaVisto: "Ontem, 20:00h", recompensa: "Não",
        contato: "(62) 99222-XXXX", fotoUrl: "https://placekitten.com/600/400?image=1",
        detalhes: "Muito dócil, ronrona ao toque. Parece ter sido abandonado ou fugido recentemente."
    }
];

// 3. PETS PARA ADOÇÃO
const PETS_ADOCAO = [
    {
        id: 201, nome: "Estrela", raca: "SRD", idade: "6 meses", sexo: "Fêmea", porte: "Médio (Futuro)", cor: "Preto",
        ong: "SOS Patinhas Goiânia", fotoUrl: "https://placedog.net/600/400?random&id=201",
        descricao: "Estrela é uma filhotinha resgatada de maus tratos no Setor Criméia. Está vacinada e vermifugada. Muito brincalhona e adora crianças."
    },
    {
        id: 202, nome: "Bala", raca: "Gato Siamês", idade: "2 anos", sexo: "Macho", porte: "Pequeno", cor: "Creme e Marrom",
        ong: "Adoção Goiana", fotoUrl: "https://placekitten.com/600/400?image=2",
        descricao: "Gato de temperamento calmo, ideal para apartamentos. Já está castrado e testado negativo para Fiv/Felv. Precisa de um lar tranquilo."
    }
];

// 4. VAGAS DE VOLUNTARIADO
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
    }
];

// Junta todos os anúncios de busca (perdidos e encontrados) para o filtro
const TODOS_ANUNCIOS = [...ANUNCIOS_PERDIDOS, ...PETS_ENCONTRADOS];

// --- CONSTANTES E REFERÊNCIAS DOM ---
const WHATSAPP_NUMBER = "5562993901617";
const WHATSAPP_ID = "Keve/Alessandra/ariel/Kevin/joel";

const gridPerdidos = document.getElementById('announcement-grid-perdidos');
const gridEncontrados = document.getElementById('announcement-grid-encontrados');
const gridAdocao = document.getElementById('adoption-grid');
const gridVoluntario = document.getElementById('volunteer-grid');
const filterInput = document.getElementById('filter-input');
const modal = document.getElementById('pet-details-modal');
const modalContent = document.getElementById('modal-body-content');
const closeModalBtn = document.querySelector('.close-button');


// --- FUNÇÕES DE UTILIDADE ---

/**
 * Gera o link de contato direto para o WhatsApp.
 * @param {string} petNome - Nome do pet para a mensagem.
 * @param {string} petTipo - Tipo do anúncio ('perdido' ou 'encontrado').
 * @returns {string} O link completo do WhatsApp.
 */
function renderWhatsAppCTA(petNome, petTipo) {
    let message = `${WHATSAPP_ID} | Quero falar sobre o pet ${petNome} (${petTipo.toUpperCase()}) | Contato: `;
    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// --- FUNÇÕES GERAIS DE RENDERIZAÇÃO ---

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
    // CTA Adoção via WhatsApp, pedindo informações do pet
    const whatsappLink = renderWhatsAppCTA(pet.nome, 'adoção');
    
    return `
        <div class="adoption-card">
            <img src="${pet.fotoUrl}" alt="Foto do ${pet.nome}" loading="lazy">
            <h3>${pet.nome} (${pet.sexo})</h3>
            <p><strong>Raça:</strong> ${pet.raca}</p>
            <p><strong>Idade:</strong> ${pet.idade}</p>
            <p><strong>ONG:</strong> ${pet.ong}</p>
            <p class="description">${pet.descricao}</p>
            <a href="${whatsappLink}" target="_blank" class="btn-primary-cta" style="margin-top: 15px; background-color: #9B59B6; padding: 10px 20px;"><i class="fab fa-whatsapp"></i> Quero Adotar</a>
        </div>
    `;
}

/**
 * Cria o HTML para o card de Voluntariado.
 */
function generateVolunteerCardHTML(vaga) {
    return `
        <div class="volunteer-card">
            <h3>${vaga.funcao}</h3>
            <p><strong><i class="fas fa-city"></i> ONG/Local:</strong> ${vaga.ong}</p>
            <p><strong><i class="fas fa-clipboard-list"></i> Requisitos:</strong> ${vaga.requisitos}</p>
            <a href="mailto:${vaga.contato}" class="btn-filter" style="margin-top: 15px; padding: 10px 20px; background-color: #F39C12;"><i class="fas fa-envelope"></i> Contato por Email</a>
        </div>
    `;
}

/**
 * Renderiza todas as seções (Perdidos, Encontrados, Adoção, Voluntariado).
 */
function renderAllSections() {
    gridPerdidos.innerHTML = ANUNCIOS_PERDIDOS.map(generateAnnouncementCardHTML).join('');
    gridEncontrados.innerHTML = PETS_ENCONTRADOS.map(generateAnnouncementCardHTML).join('');
    gridAdocao.innerHTML = PETS_ADOCAO.map(generateAdoptionCardHTML).join('');
    gridVoluntario.innerHTML = VAGAS_VOLUNTARIADO.map(generateVolunteerCardHTML).join('');
    renderTestimonials();
}

// --- FUNÇÃO DE FILTRO (APENAS PARA PERDIDOS/ENCONTRADOS) ---

function filterAnnouncements() {
    const input = filterInput.value.toLowerCase().trim();
    
    if (input.length < 2 && input.length > 0) {
        alert("Digite pelo menos 2 caracteres para refinar a busca.");
        return;
    }
    
    const filteredList = TODOS_ANUNCIOS.filter(pet => 
        pet.nome.toLowerCase().includes(input) || 
        pet.bairro.toLowerCase().includes(input) ||
        pet.raca.toLowerCase().includes(input) ||
        pet.cor.toLowerCase().includes(input) ||
        pet.detalhes.toLowerCase().includes(input)
    );
    
    // Limpa e exibe os resultados na seção de Perdidos (por ser o foco principal)
    gridPerdidos.innerHTML = '';
    gridEncontrados.innerHTML = '';

    if (filteredList.length === 0) {
        gridPerdidos.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-size: 1.5em; color: var(--color-primary); padding: 50px 0;">Nenhum anúncio correspondente foi encontrado em Goiânia.</p>';
        gridEncontrados.innerHTML = ''; // Garante que a seção Encontrados também fique limpa no resultado
    } else {
        const perdidosFiltrados = filteredList.filter(pet => pet.tipo === 'perdido');
        const encontradosFiltrados = filteredList.filter(pet => pet.tipo === 'encontrado');

        if (perdidosFiltrados.length > 0) {
             gridPerdidos.innerHTML = perdidosFiltrados.map(generateAnnouncementCardHTML).join('');
        } else {
            gridPerdidos.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #777;">Nenhum Pet *Perdido* encontrado para o filtro.</p>';
        }

        if (encontradosFiltrados.length > 0) {
            gridEncontrados.innerHTML = encontradosFiltrados.map(generateAnnouncementCardHTML).join('');
        } else {
            gridEncontrados.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #777;">Nenhum Pet *Encontrado* encontrado para o filtro.</p>';
        }
    }
}

function resetFilters() {
    filterInput.value = '';
    // Volta a renderizar as listas iniciais
    renderAllSections();
}


// --- FUNÇÃO DO MODAL ---

function openPetDetails(petId, petType) {
    const sourceArray = petType === 'perdido' ? ANUNCIOS_PERDIDOS : PETS_ENCONTRADOS;
    const pet = sourceArray.find(p => p.id === petId);
    if (!pet) return;

    const badgeStyle = petType === 'perdido' ? 'color: var(--color-primary);' : 'color: var(--color-secondary);';
    
    // Gera o link de contato com WhatsApp, chamando o contato do próprio anunciante do pet
    const whatsAppLink = `https://wa.me/${pet.contato.replace(/[^\d]/g, '')}?text=Olá,%20vi%20o%20anúncio%20do(a)%20${pet.nome}%20(${petType})%20no%20AnimaisPerdidosGoiania%20e%20tenho%20informações!`;

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
        
        <a href="${whatsAppLink}" target="_blank" class="btn-contact-modal"> <i class="fab fa-whatsapp"></i> Falar com o Dono/Encontrador (${pet.contato})</a>
        <a href="tel:${pet.contato}" class="btn-contact-modal" style="background-color: var(--color-primary); margin-top: 10px;"> <i class="fas fa-phone"></i> Ligar Urgente</a>
    `;

    modal.style.display = "block";
    document.body.style.overflow = 'hidden';
}

function closePetDetails() {
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
}

// --- HISTÓRIAS DE SUCESSO ---

function renderTestimonials() {
    const testimonialData = [
        { avatar: "https://i.pravatar.cc/150?img=11", autor: "Dona Maria (Setor Oeste)", pet: "Mingau (Gato)", texto: "Nunca pensei que encontraria meu gato, Mingau, depois de 3 dias. A rede de voluntários foi essencial! Gratidão eterna!" },
        { avatar: "https://i.pravatar.cc/150?img=12", autor: "João Silva (Jardim América)", pet: "Max (Basset)", texto: "O site me ajudou a identificar o dono do Basset Hound que encontrei na rua. Em 2 horas, ele estava em casa. Trabalho incrível!" },
        { avatar: "https://i.pravatar.cc/150?img=13", autor: "Família Costa (Vila Redenção)", pet: "Belinha (Vira-Lata)", texto: "Graças ao alerta de recompensa, Belinha foi vista e resgatada na mesma noite. Vocês trouxeram a alegria de volta para nossa casa!" },
        { avatar: "https://i.pravatar.cc/150?img=14", autor: "Voluntário Pedro", pet: "Cão idoso", texto: "Consegui resgatar um cão idoso desorientado perto do Mutirão. Usando o banco de dados, o dono foi localizado em 3 horas. Missão cumprida!" }
    ];

    const carousel = document.getElementById('testimonial-carousel');
    carousel.innerHTML = testimonialData.map(test => `
        <div class="testimonial-card">
            <img src="${test.avatar}" alt="Foto do depoente" class="test-avatar">
            <p class="testimonial-text">"${test.texto}"</p>
            <p class="testimonial-author">- ${test.autor}</p>
            <p class="pet-status">Reencontrado: ${test.pet}</p>
        </div>
    `).join('');
}


// --- INICIALIZAÇÃO E LISTENERS ---

// Event Listeners para o Modal
closeModalBtn.onclick = closePetDetails;
window.onclick = function(event) {
    if (event.target == modal) {
        closePetDetails();
    }
}

// Inicialização: Renderiza todo o conteúdo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderAllSections();

    // Adiciona evento de tecla Enter no input de filtro
    filterInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterAnnouncements();
        }
    });
});