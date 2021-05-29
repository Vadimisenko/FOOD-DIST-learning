import {openModal, closeModal} from  './modal';
import {postData} from '../services/services';

function forms (formSelector, modalTimerId) {
    
        // Forms

        const forms = document.querySelectorAll(formSelector);

        const message = {
            loadng: 'img/spinner.svg',
            sucsess: 'Спасибо!',
            failure: 'Что-то пошло не так'
        };
    
        forms.forEach(item => {
            bindpostData(item);
        });
    

    
        function bindpostData (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
    
                const statusMessage = document.createElement('img');
                    statusMessage.src = message.loadng;
                    statusMessage.style.cssText = `
                        display: block;
                        margin: 0 auto;`;
                    form.insertAdjacentElement('afterend', statusMessage);
    
                const formData = new FormData(form);
                
                const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
                postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.sucsess);
                    statusMessage.remove();
                }).catch( () => {
                    showThanksModal(message.failure);
                }).finally( () => {
                    form.reset();
                });
    
            });
        }
        
        function showThanksModal (message) {
            const prevModDialog = document.querySelector('.modal__dialog');
            prevModDialog.classList.add('hide');
            openModal('.modal', modalTimerId);
    
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
    
            document.querySelector('.modal').append(thanksModal);
    
            setTimeout( () => {
                thanksModal.remove();
                prevModDialog.classList.add('show');
                prevModDialog.classList.remove('hide');
                closeModal('.modal');
            }, 4000);
        }
}

export default forms;