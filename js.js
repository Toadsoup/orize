$(window).load(function () {
    $('.hodor').orize({'orizer': 'hodorize'});
    $('.raptor').orize({'orizer': 'raptorize'});
    $('.cage').orize({'orizer': 'cagorize'});
    $('.trogdor').orize({'orizer': 'trogdorize'});

    // For The Konami Code Version
    $('body').orize({
        'enterOn': 'konami-code',
        'orizer': 'raptorize'
        }).orize({
            'enterOn': 'timer',
            'delayTime': 2000
        });
    });