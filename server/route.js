Router.map(function() {
    this.route('alertVehicle', {
        path: '/api/vehicle/alert',
        where: 'server',
        action: function () {
            // GET, POST, PUT, DELETE
            var requestMethod = 'GET';
            // Data from a POST request

            var vehicleID = this.params.query.vehicleID;
            var latitude = this.params.query.latitude;
            var longitude = this.params.query.longitude;
            var locationName = this.params.query.locationName;

            VStatus.update(
                {vehicleID: vehicleID}, {
                    $set: {
                    latitude: latitude,
                    longitude: longitude,
                    locationName: locationName,
                    timestamp: new Date().valueOf()
                 }
                },{upsert: true});

            this.response.statusCode = 200;
            this.response.end('success');
        }
    });
});