document.addEventListener('DOMContentLoaded', function () {
    // Update timestamp
    const now = new Date();
    const timestamp = document.getElementById('timestamp');
    if (timestamp) {
        timestamp.textContent = now.toUTCString().replace('GMT', 'UTC');
    }

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Add some terminal-like effects
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        block.addEventListener('mouseenter', () => {
            block.style.borderColor = 'var(--bright-blue)';
        });
        block.addEventListener('mouseleave', () => {
            block.style.borderColor = 'var(--border)';
        });
    });

    const copyFingerprintBtn = document.querySelector('.copy-fingerprint-btn');
    const fingerprintCode = document.querySelector('.contact-info code');
    
    if (copyFingerprintBtn && fingerprintCode) {
        copyFingerprintBtn.addEventListener('click', async function() {
            const fingerprint = fingerprintCode.textContent.replace('fingerprint:', '').trim();
            try {
                await navigator.clipboard.writeText(fingerprint);
                const original = this.textContent;
                this.textContent = '✓ copied!';
                setTimeout(() => {
                    this.textContent = original;
                }, 1500);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    }

    
    const copyKeyBtn = document.getElementById('copy-key-btn');
    if (copyKeyBtn) {
        copyKeyBtn.addEventListener('click', async function() {
            const keyBlock = document.getElementById('pgp-key-block');
            if (keyBlock) {
               
                let keyText = keyBlock.textContent;
                keyText = keyText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                
                try {
                    await navigator.clipboard.writeText(keyText);
                    const original = this.textContent;
                    this.textContent = '✓ copied!';
                    setTimeout(() => {
                        this.textContent = original;
                    }, 1500);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            }
        });
    }

    // Download key functionality
    const downloadBtn = document.getElementById('download-key');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const keyBlock = document.getElementById('pgp-key-block');
            if (keyBlock) {
                let keyText = keyBlock.textContent;
                keyText = keyText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                const blob = new Blob([keyText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'lopuh_pgp_public_key.asc';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        });
    }
});