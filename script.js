document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dreamForm');
    const dreamInput = document.getElementById('dreamInput');
    const interpretationResult = document.getElementById('interpretationResult');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // منع إرسال النموذج

        const dreamText = dreamInput.value.trim();

        if (dreamText) {
            // إرسال النص إلى الخادم
            fetch('/interpret', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dream: dreamText }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.interpretation) {
                    interpretationResult.textContent = `تفسير حلمك: ${data.interpretation}`;
                } else {
                    interpretationResult.textContent = 'لم يتم العثور على تفسير لهذا الحلم.';
                }
            })
            .catch(error => {
                console.error('حدث خطأ:', error);
                interpretationResult.textContent = 'حدث خطأ أثناء تفسير الحلم.';
            });
        } else {
            interpretationResult.textContent = 'يرجى إدخال حلمك أولاً.';
        }
    });
});
