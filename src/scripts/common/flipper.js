{
    const DOC = document;
    const WIN = window;

    const flipper = DOC.getElementById('flipper');
    const button = DOC.getElementById('flipper-rotate');

    flipper && DOC.addEventListener('DOMContentLoaded', () => {
        button
            .addEventListener('click', () => {
                flipper.classList.toggle('rotate');
                button.classList.add('hidden');
        });

        // button.addEventListener('click', () => {
        //     flipper.classList.toggle('rotate');

        // });

        DOC.getElementsByTagName('body')[0]
            .addEventListener('click', (e) => {
                if (!e.target.closest('#flipper') && !e.target.closest('#flipper-rotate')) {
                    if (flipper.classList.contains('rotate')) {
                        flipper.classList.remove('rotate');
                        button.classList.remove('hidden');
                    }
                }
            });
    });

};
