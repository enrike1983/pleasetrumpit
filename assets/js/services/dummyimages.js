app.service('DummyImages', function($http) {
    return {
        getImages: function () {
            var url = "http://localhost:4000/400/400";
            return $http({
                method: 'GET',
                url: url
            });
        }
    };
});

