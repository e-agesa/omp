<?php
/**
 * OMP Unified Search — products, symptoms, articles
 */

defined('ABSPATH') || exit;

class OMP_Search {

    private string $namespace = 'omp/v1';

    public function register_routes(): void {
        register_rest_route($this->namespace, '/search', [
            'methods'             => 'GET',
            'callback'            => [$this, 'search'],
            'permission_callback' => '__return_true',
            'args'                => [
                'q' => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            ],
        ]);
    }

    /**
     * Unified search across products, symptoms, and health articles.
     */
    public function search(WP_REST_Request $request): WP_REST_Response {
        $query   = $request->get_param('q');
        $results = [];

        // 1. Search WooCommerce products
        $products = wc_get_products([
            'limit'  => 5,
            'status' => 'publish',
            's'      => $query,
        ]);

        foreach ($products as $product) {
            $image = wp_get_attachment_image_url($product->get_image_id(), 'thumbnail');
            $results[] = [
                'type'  => 'product',
                'id'    => $product->get_id(),
                'title' => $product->get_name(),
                'slug'  => $product->get_slug(),
                'image' => $image ?: null,
                'price' => $product->get_price(),
            ];
        }

        // 2. Search health articles (posts)
        $articles = get_posts([
            'post_type'      => 'post',
            'posts_per_page' => 3,
            's'              => $query,
            'category_name'  => 'health',
        ]);

        foreach ($articles as $article) {
            $results[] = [
                'type'  => 'article',
                'id'    => $article->ID,
                'title' => $article->post_title,
                'slug'  => $article->post_name,
                'image' => get_the_post_thumbnail_url($article->ID, 'thumbnail') ?: null,
            ];
        }

        // 3. Match symptoms from product tags
        $symptom_tags = get_terms([
            'taxonomy' => 'product_tag',
            'search'   => $query,
            'number'   => 3,
        ]);

        if (!is_wp_error($symptom_tags)) {
            foreach ($symptom_tags as $tag) {
                $results[] = [
                    'type'  => 'symptom',
                    'id'    => $tag->term_id,
                    'title' => $tag->name,
                    'slug'  => $tag->slug,
                ];
            }
        }

        return new WP_REST_Response($results);
    }
}
