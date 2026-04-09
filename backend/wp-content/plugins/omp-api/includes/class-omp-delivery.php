<?php
/**
 * OMP Hyper-Local Delivery Estimation
 * Uses geolocation to determine delivery zone and ETA.
 */

defined('ABSPATH') || exit;

class OMP_Delivery {

    private string $namespace = 'omp/v1';

    /**
     * Delivery zones with center coordinates and radius.
     * In production, this would come from the database.
     */
    private array $zones = [
        [
            'id'          => 'westlands',
            'name'        => 'Westlands',
            'lat'         => -1.2636,
            'lng'         => 36.8040,
            'radius_km'   => 5,
            'eta_minutes'  => 30,
            'shipping_cost' => 150,
            'estates'      => ['Westlands', 'Parklands', 'Highridge', 'Kangemi'],
        ],
        [
            'id'          => 'kilimani',
            'name'        => 'Kilimani',
            'lat'         => -1.2892,
            'lng'         => 36.7838,
            'radius_km'   => 4,
            'eta_minutes'  => 25,
            'shipping_cost' => 150,
            'estates'      => ['Kilimani', 'Hurlingham', 'Yaya Centre', 'Ngong Road'],
        ],
        [
            'id'          => 'karen',
            'name'        => 'Karen',
            'lat'         => -1.3185,
            'lng'         => 36.7111,
            'radius_km'   => 6,
            'eta_minutes'  => 45,
            'shipping_cost' => 250,
            'estates'      => ['Karen', 'Lang\'ata', 'Hardy', 'Ngong'],
        ],
        [
            'id'          => 'cbd',
            'name'        => 'Nairobi CBD',
            'lat'         => -1.2864,
            'lng'         => 36.8172,
            'radius_km'   => 3,
            'eta_minutes'  => 35,
            'shipping_cost' => 100,
            'estates'      => ['CBD', 'Upper Hill', 'Community', 'River Road'],
        ],
        [
            'id'          => 'eastlands',
            'name'        => 'Eastlands',
            'lat'         => -1.2750,
            'lng'         => 36.8600,
            'radius_km'   => 6,
            'eta_minutes'  => 50,
            'shipping_cost' => 200,
            'estates'      => ['Buruburu', 'Donholm', 'Umoja', 'Embakasi'],
        ],
    ];

    public function register_routes(): void {
        register_rest_route($this->namespace, '/delivery/estimate', [
            'methods'             => 'GET',
            'callback'            => [$this, 'estimate'],
            'permission_callback' => '__return_true',
            'args'                => [
                'lat' => ['required' => true, 'type' => 'number'],
                'lng' => ['required' => true, 'type' => 'number'],
            ],
        ]);
    }

    /**
     * Calculate delivery estimate based on user coordinates.
     */
    public function estimate(WP_REST_Request $request): WP_REST_Response {
        $user_lat = (float) $request->get_param('lat');
        $user_lng = (float) $request->get_param('lng');

        $closest_zone = null;
        $min_distance = PHP_FLOAT_MAX;

        foreach ($this->zones as $zone) {
            $distance = $this->haversine($user_lat, $user_lng, $zone['lat'], $zone['lng']);

            if ($distance < $zone['radius_km'] && $distance < $min_distance) {
                $min_distance = $distance;
                $closest_zone = $zone;
            }
        }

        if (!$closest_zone) {
            // User is outside known zones — provide general estimate
            return new WP_REST_Response([
                'zone'        => 'Greater Nairobi',
                'eta_minutes' => 90,
                'cost'        => 300,
                'badge'       => null,
            ]);
        }

        $badge = $closest_zone['eta_minutes'] <= 30 ? 'Get it in 30 Mins' : null;

        return new WP_REST_Response([
            'zone'        => $closest_zone['name'],
            'eta_minutes' => $closest_zone['eta_minutes'],
            'cost'        => $closest_zone['shipping_cost'],
            'badge'       => $badge,
        ]);
    }

    /**
     * Haversine formula — distance between two coordinates in km.
     */
    private function haversine(float $lat1, float $lon1, float $lat2, float $lon2): float {
        $earth_radius = 6371; // km

        $d_lat = deg2rad($lat2 - $lat1);
        $d_lon = deg2rad($lon2 - $lon1);

        $a = sin($d_lat / 2) * sin($d_lat / 2)
           + cos(deg2rad($lat1)) * cos(deg2rad($lat2))
           * sin($d_lon / 2) * sin($d_lon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earth_radius * $c;
    }
}
