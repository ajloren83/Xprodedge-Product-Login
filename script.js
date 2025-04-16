// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const passwordIcon = document.getElementById('password-toggle-icon');

    if (passwordField.type === "password") {
        passwordField.type = "text";
        passwordIcon.src = "assets/password-hide.svg";
    } else {
        passwordField.type = "password";
        passwordIcon.src = "assets/password.svg";
    }
}

// Function to toggle dark/light mode
function toggleTheme() {
    const body = document.body;
    const themeToggleBtn = document.querySelector('.btn-secondary[type="button"] img');
    const isDarkMode = body.classList.contains('light-theme');
    const assets = document.querySelectorAll('img[src*="assets/"]');

    if (isDarkMode) {
        body.classList.remove('light-theme');
        themeToggleBtn.src = "assets/dark.svg";
        localStorage.setItem('theme', 'dark');
        
        assets.forEach(img => {
            const src = img.src;
            const baseName = src.split('/').pop().split('.')[0];
            if (baseName.endsWith('-light')) {
                const extension = src.split('.').pop();
                img.src = src.replace('-light', '');
            }
        });
    } else {
        body.classList.add('light-theme');
        themeToggleBtn.src = "assets/light.svg";
        localStorage.setItem('theme', 'light');
        
        assets.forEach(img => {
            const src = img.src;
            const baseName = src.split('/').pop().split('.')[0];
            if (!baseName.endsWith('-light') && !src.includes('dark.svg') && !src.includes('light.svg')) {
                const extension = src.split('.').pop();
                const lightVersion = src.replace(`.${extension}`, `-light.${extension}`);
                fetch(lightVersion)
                    .then(response => {
                        if (response.ok) {
                            img.src = lightVersion;
                        }
                    })
                    .catch(() => {});
            }
        });
    }
}

// Language change functionality
const languageTexts = {
    en: {
        'user-id-text': 'User ID',
        'password-text': 'Password',
        'forgot-password': 'Forgot Password?',
        'contact': 'Raise a Query',
        'ticket-status': 'View Ticket Status',
        'privacy-policy': 'Privacy Policy',
        'terms-conditions': 'Terms & Conditions',
        'rights-reserved': 'All Rights Reserved.',
        'coming-soon': 'Coming soon',
        'explore': 'Explore',
        'edgerp-desc': 'Digital transformation is a business discipline',
        'invoicedge-desc': 'A SaaS based integrated e-Invoice engine with PEPPOL network',
        'telto-desc': 'Make your service station digital',
        'glazox-desc': 'Your digital event partner is here',
        'english': 'English',
        'portuguese': 'Portugese',
        'user-id-placeholder': 'Enter user id',
        'password-placeholder': 'Enter password'
    },
    pt: {
        'user-id-text': 'ID de usuário',
        'password-text': 'Senha',
        'forgot-password': 'Esqueceu a senha?',
        'contact': 'Enviar uma consulta',
        'ticket-status': 'Ver status do ticket',
        'privacy-policy': 'Política de Privacidade',
        'terms-conditions': 'Termos e Condições',
        'rights-reserved': 'Todos os direitos reservados.',
        'coming-soon': 'Em breve',
        'explore': 'Explorar',
        'edgerp-desc': 'Transformação digital é uma disciplina de negócios',
        'invoicedge-desc': 'Um mecanismo de e-Fatura integrado baseado em SaaS com rede PEPPOL',
        'telto-desc': 'Torne sua estação de serviço digital',
        'glazox-desc': 'Seu parceiro de eventos digitais está aqui',
        'english': 'Inglês',
        'portuguese': 'Português',
        'user-id-placeholder': 'Digite o ID do usuário',
        'password-placeholder': 'Digite a senha'
    }
};

function changeLanguage(lang) {
    // Update all text content
    Object.entries(languageTexts[lang]).forEach(([key, value]) => {
        const elements = document.querySelectorAll(`[data-lang="${key}"]`);
        elements.forEach(el => {
            if (el.tagName === 'INPUT') {
                el.placeholder = value;
            } else {
                el.textContent = value;
            }
        });
    });

    // Update button states only (keep text and icons constant)
    const languageButtons = document.querySelectorAll('.btn-group .btn');
    languageButtons.forEach(btn => {
        if (btn.textContent.includes(lang === 'en' ? 'English' : 'Portugese')) {
            btn.classList.add('active');
            btn.classList.remove('language');
        } else {
            btn.classList.remove('active');
            btn.classList.add('language');
        }
    });

    // Save language preference
    localStorage.setItem('language', lang);
}

// Initialize language
function initializeLanguage() {
    const savedLang = localStorage.getItem('language') || 'en';
    changeLanguage(savedLang);
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.querySelector('.btn-secondary[type="button"]');
    themeToggleBtn.addEventListener('click', toggleTheme);
    initializeTheme();
    initializeLanguage();
});
