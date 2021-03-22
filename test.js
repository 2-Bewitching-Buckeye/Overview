// select
//   json_build_object(
//     'results', json_agg(
//       json_build_object(
//         'style_id', s.style_id,
//         'name', s.name,
//         'original_price', s.original_price,
//         'sale_price', s.sale_price,
//         'default', s.default_style,
//         'photos', images
//         )
//       )
//     ) product
//     from styles s
//       left join (
//         select
//           style_id,
//           json_agg(
//             json_build_object(
//               'image_url', p.image_url,
//               'thumbnail_url', p.thumbnail_url
//             )
//           ) images
//         from photos p
//         GROUP BY style_id) p ON p.style_id = s.style_id WHERE s.product_id = 1;



// select
//   json_build_object(
//     'product_id', ${req.params.product_id},
//     'results', json_agg(
//       json_build_object(
//         'style_id', s.style_id,
//         'name', s.name,
//         'original_price', s.original_price,
//         'sale_price', s.sale_price,
//         'default', s.default_style,
//         'photos', images
//         )
//       )
//     ) product
//     from styles s
//       left join (
//         select
//           style_id,
//           json_agg(
//             json_build_object(
//               'image_url', p.image_url,
//               'thumbnail_url', p.thumbnail_url
//             )
//           ) images
//         from photos p
//         GROUP BY style_id) p ON p.style_id = s.style_id WHERE s.product_id = ${req.params.product_id};

SELECT jsonb_agg(nested_results) AS results
  FROM (
    SELECT s.product_id, s.style_id, s.name, s.original_price, s.sale_price, s.default_style,
      (
        SELECT jsonb_agg(nested_photos)
        FROM (
          SELECT p.image_url, p.thumbnail_url
          FROM photos p
          WHERE p.style_id = s.style_id
        ) AS nested_photos
      ) AS photos,
      (
        SELECT jsonb_agg(nested_skus)
        FROM (
          SELECT jsonb_build_object(
            sk.skus_id,(
              SELECT jsonb_agg(nestd_skus_value)
              FROM (
                SELECT sk.size, sk.quantity
                FROM skus sk
                WHERE sk.style_id = s.style_id
              ) AS nestd_skus_value
            ) GROUP BY sk.skus_id
          ) AS skus
          FROM skus sk
          WHERE sk.style_id = s.style_id
        ) AS nested_skus
      ) AS skus
    FROM styles s
  ) AS nested_results
  WHERE product_id = ${req.params.product_id}





  //work

  // SELECT jsonb_agg(nested_results) AS results
  // FROM (
  //   SELECT s.product_id, s.style_id, s.name, s.original_price, s.sale_price, s.default_style,
  //     (
  //       SELECT jsonb_agg(nested_photos)
  //       FROM (
  //         SELECT p.image_url, p.thumbnail_url
  //         FROM photos p
  //         WHERE p.style_id = s.style_id
  //       ) AS nested_photos
  //     ) AS photos
  //   FROM styles s
  // ) AS nested_results
  // WHERE product_id = ${req.params.product_id}