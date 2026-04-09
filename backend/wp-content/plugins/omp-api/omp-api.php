<?php
/**
 * Plugin Name: OMP Custom API
 * Description: Custom REST API endpoints for Online Mega Pharmacy — M-Pesa, Prescription, Search, Delivery
 * Version: 1.0.0
 * Author: Web Max Limited
 * Text Domain: omp-api
 */

defined('ABSPATH') || exit;

// Load endpoint files
require_once plugin_dir_path(__FILE__) . 'includes/class-omp-mpesa.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-omp-prescription.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-omp-search.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-omp-delivery.php';

/**
 * Register all REST routes under /wp-json/omp/v1/
 */
add_action('rest_api_init', function () {
    $mpesa        = new OMP_Mpesa();
    $prescription = new OMP_Prescription();
    $search       = new OMP_Search();
    $delivery     = new OMP_Delivery();

    $mpesa->register_routes();
    $prescription->register_routes();
    $search->register_routes();
    $delivery->register_routes();
});
