-- ##########################################################
-- BOOKWORM COMPLETE DB SEED SCRIPT (BRD COMPLIANT)
-- Target Database: db_bookworm3
-- Features: Revenue Distribution, Product Attributes, Library Packages
-- ##########################################################

-- Ensure we are using the correct database
CREATE DATABASE IF NOT EXISTS db_bookworm3;
USE db_bookworm3;

-- 1. MASTER DATA: PRODUCT TYPES
INSERT INTO product_type_master (type_id, type_desc) VALUES 
(1, 'Ebook'), 
(2, 'Audiobook'),
(3, 'Music'),
(4, 'Video')
ON DUPLICATE KEY UPDATE type_desc = VALUES(type_desc);

-- 2. MASTER DATA: LANGUAGES
INSERT INTO language_master (language_id, language_desc, type_id) VALUES 
(1, 'English', 1),
(2, 'Marathi', 1),
(3, 'Hindi', 1)
ON DUPLICATE KEY UPDATE language_desc = VALUES(language_desc);

-- 3. MASTER DATA: GENRES
INSERT INTO genre_master (genre_id, genre_desc, language_id) VALUES 
(1, 'Classic', 1),
(2, 'Horror', 2),
(3, 'Children', 2),
(4, 'Novel', 2),
(5, 'History', 1),
(6, 'Biography', 1),
(7, 'Drama', 1),
(8, 'Social', 3),
(9, 'Thriller', 1)
ON DUPLICATE KEY UPDATE genre_desc = VALUES(genre_desc);

-- 4. MASTER DATA: ATTRIBUTES
INSERT INTO attribute_master (attribute_id, attribute_desc) VALUES 
(1, 'Format'),
(2, 'Pages'),
(3, 'Duration'),
(4, 'File Size'),
(5, 'Quality')
ON DUPLICATE KEY UPDATE attribute_desc = VALUES(attribute_desc);

-- 5. MASTER DATA: BENEFICIARIES (Revenue Distribution Stakeholders)
INSERT INTO beneficiary_master (ben_id, ben_name, ben_email, ben_contact_no, bank_name, bank_branch, ifsc, account_no, account_type, pan) VALUES 
(1, 'Bookworm Holdings Ltd.', 'finance@bookworm.com', '9999999991', 'ICICI Bank', 'Main Branch', 'ICIC0001', 'ACCT-1001', 'SAVINGS', 'PAN-BW01'),
(2, 'Author Royalty Fund', 'royalty@writers.in', '9999999992', 'HDFC Bank', 'Creative Branch', 'HDFC0002', 'ACCT-1002', 'CURRENT', 'PAN-AF02'),
(3, 'Literature Foundation', 'contact@litfound.org', '9999999993', 'SBI', 'Delhi Branch', 'SBIN0003', 'ACCT-1003', 'SAVINGS', 'PAN-LF03'),
(4, 'Digital Rights Collective', 'admin@drc.com', '9999999994', 'Axis Bank', 'Digital Branch', 'AXIS0004', 'ACCT-1004', 'CURRENT', 'PAN-DR04'),
(5, 'The Tagore Estate', 'trustee@tagore.in', '9999999995', 'Standard Chartered', 'Kolkata Branch', 'SCBL0005', 'ACCT-1005', 'SAVINGS', 'PAN-TE05')
ON DUPLICATE KEY UPDATE ben_name = VALUES(ben_name);

-- 6. MASTER DATA: LIBRARY PACKAGES (BRD Section 6)
INSERT INTO library_package
(package_id, package_name, price, validity_days, max_selectable_books, active)
VALUES 
(1, '30 Days / 3 Books',  50.00, 30, 3,  1),
(2, '45 Days / 5 Books', 120.00, 45, 5,  1),
(3, '90 Days / 10 Books', 500.00, 90, 10, 1)
ON DUPLICATE KEY UPDATE
    package_name = VALUES(package_name),
    price = VALUES(price),
    validity_days = VALUES(validity_days),
    max_selectable_books = VALUES(max_selectable_books),
    active = VALUES(active);


-- 7. MASTER DATA: PUBLISHERS
INSERT INTO publisher (publisher_id, publisher_name, publisher_email, publisher_phone, address) VALUES 
(1, 'Bookworm Heritage Press', 'contact@bookworm.com', '1234567890', 'Mumbai, India'),
(2, 'Project Gutenberg', 'info@gutenberg.org', '00000000', 'Online Library'),
(3, 'Popular Prakashan', 'sales@popular.in', '22222222', 'Pune, India')
ON DUPLICATE KEY UPDATE publisher_name = VALUES(publisher_name);

-- 8. AUTHOR INSERTIONS
INSERT INTO author (author_id, author_name, author_mail, phone_no, biography) VALUES 
(1, 'George Orwell', 'orwell@books.com', '101', 'British novelist, essayist, and critic.'),
(2, 'Rahul Sankrityayan', 'rahul@history.in', '102', 'The Father of Indian Travelogue.'),
(3, 'Rabindranath Tagore', 'tagore@literature.in', '103', 'Nobel laureate and creator of Gitanjali.'),
(4, 'William Shakespeare', 'bard@stratford.com', '104', 'The greatest dramatist and poet.'),
(5, 'Sane Guruji', 'sane@marathi.in', '105', 'Marathi author known for Shyamachi Aai.'),
(6, 'Shrenik Sarde', 'shrenik@horror.in', '106', 'Contemporary Marathi horror writer.'),
(7, 'Suraj Gatade', 'suraj@literature.in', '107', 'Author of Rahee.'),
(8, 'Sachin Kulli', 'sachin@stories.in', '108', 'Regional Marathi author.'),
(9, 'Katherine Applegate', 'katherine@audio.com', '109', 'American children\'s author.'),
(10, 'Michelle Hodkin', 'michelle@audio.com', '110', 'Author of Mara Dyer trilogy.'),
(11, 'Gregg Hurwitz', 'gregg@thriller.com', '111', 'Suspense and thriller novelist.')
ON DUPLICATE KEY UPDATE author_name = VALUES(author_name);

-- 9. PRODUCT INSERTIONS
-- Includes renaming "1984" to "Ambulancing On the French Front"
INSERT INTO product_master (product_id, product_name, product_english_name, type_id, language_id, genre_id, publisher_id, base_price, sp_cost, offer_price, offer_expiry_date, short_desc, long_desc, isbn, is_rentable, is_library, rent_per_day, min_rent_days) VALUES 
(1, 'Ambulancing On the French Front', 'Ambulancing On the French Front', 1, 1, 1, 1, 299.00, 150.00, 199.00, '2026-12-31', 'Dystopian classic.', 'A haunting tale of totalitarian control and resilience.', 'ISBN-001', 1, 1, 5.00, 7),
(2, 'Meri Europe Yatra', 'My Europe Journey', 1, 3, 8, 1, 199.00, 100.00, 149.00, '2026-12-31', 'Classic travelogue.', 'Deep insights into 1940s Europe.', 'ISBN-002', 1, 0, 3.00, 7),
(3, 'Tagore Anthology', 'Tagore Anthology', 1, 1, 6, 1, 450.00, 200.00, 350.00, '2026-12-31', 'Works of Tagore.', 'A collection of poems and letters.', 'ISBN-003', 0, 1, 0.00, 0),
(4, 'Manav Samaj', 'Human Society', 1, 3, 8, 1, 500.00, 250.00, 399.00, '2026-12-31', 'Social history.', 'Detailed analysis of human evolution.', 'ISBN-004', 1, 1, 8.00, 14),
(5, 'Romeo and Juliet', 'Romeo and Juliet', 1, 1, 7, 2, 99.00, 10.00, 49.00, '2026-12-31', 'Stellar tragedy.', 'Classic Shakespearean play.', 'ISBN-005', 0, 1, 0.00, 0),
(6, 'Secrets of Crewe House', 'Secrets of Crewe House', 1, 1, 5, 2, 250.00, 50.00, 199.00, '2026-12-31', 'War propaganda.', 'Story of the Crewe House in WWI.', 'ISBN-006', 1, 0, 4.00, 7),
(7, 'The Voyage of the Norman D.', 'The Voyage of the Norman D.', 1, 1, 1, 2, 180.00, 40.00, 120.00, '2026-12-31', 'Adventure at sea.', 'Journals of a young explorer.', 'ISBN-007', 1, 1, 2.00, 5),
(8, 'Theodosia Ernest', 'Theodosia Ernest', 1, 1, 1, 2, 220.00, 60.00, 150.00, '2026-12-31', 'Classic literature.', 'Religious and literary debate.', 'ISBN-008', 0, 1, 0.00, 0),
(9, 'Bhhoot', 'Ghost', 1, 2, 2, 1, 199.00, 90.00, 149.00, '2026-12-31', 'Marathi Horror.', 'Thrilling supernatural encounters.', 'ISBN-009', 1, 0, 5.00, 3),
(10, 'Rahee', 'The Traveler', 1, 2, 4, 3, 250.00, 120.00, 199.00, '2026-12-31', 'A journey of life.', 'A deeply moving Marathi novel.', 'ISBN-010', 1, 1, 6.00, 7),
(11, 'Rowdy Ganpat', 'Rowdy Ganpat', 1, 2, 4, 3, 175.00, 80.00, 149.00, '2026-12-31', 'Action packed.', 'A humorous and gritty action story.', 'ISBN-011', 1, 0, 4.00, 5),
(12, 'Shyamachi Aai', 'Shyams Mother', 1, 2, 1, 3, 150.00, 50.00, 99.00, '2026-12-31', 'Iconic Marathi classic.', 'Touching story of a mother and son.', 'ISBN-012', 0, 1, 0.00, 0),
(13, 'Baal Goshti', 'Childrens Stories', 2, 2, 3, 1, 149.00, 50.00, 99.00, '2026-12-31', 'Kid tales.', 'Fun and educational stories for kids.', 'ISBN-013', 1, 1, 2.00, 30),
(14, 'Wishtree', 'Wishtree', 2, 1, 1, 1, 499.00, 200.00, 399.00, '2026-12-31', 'Nature fantasy.', 'A story told from the perspective of an old oak tree.', 'ISBN-014', 1, 1, 10.00, 7),
(15, 'The Unbecoming of Mara Dyer', 'Mara Dyer', 2, 1, 4, 1, 399.00, 150.00, 299.00, '2026-12-31', 'Psychological thriller.', 'Mystery surrounding a girl with strange powers.', 'ISBN-015', 1, 0, 8.00, 7),
(16, 'Mounaat Arth Saare', 'Meaning in Silence', 2, 2, 4, 1, 299.00, 100.00, 199.00, '2026-12-31', 'Deep philosophy.', 'Audio adaptation of poetic drama.', 'ISBN-016', 0, 1, 0.00, 0),
(17, 'The Nowhere Man', 'The Nowhere Man', 2, 1, 4, 1, 450.00, 200.00, 399.00, '2026-12-31', 'Action thriller.', 'High stakes intelligence mission.', 'ISBN-017', 1, 0, 12.00, 3),
(18, 'Kalokh', 'Darkness', 2, 2, 2, 1, 350.00, 150.00, 249.00, '2026-12-31', 'Immersive horror.', 'A scary audio experience in the dark.', 'ISBN-018', 1, 1, 7.00, 5)
ON DUPLICATE KEY UPDATE product_name = VALUES(product_name);

-- 10. PRODUCT-AUTHOR RELATIONSHIPS
INSERT INTO product_author (author_id, product_id) VALUES 
(1, 1), (2, 2), (3, 3), (2, 4), (4, 5), (10, 6), (9, 7), (1, 8), (6, 9), (7, 10), (8, 11), (5, 12),
(3, 13), (9, 14), (10, 15), (7, 16), (11, 17), (6, 18)
ON DUPLICATE KEY UPDATE author_id = author_id;

-- 11. PRODUCT-BENEFICIARY RELATIONSHIPS (Revenue Split)
-- Every product has a standard split: Bookworm(70%), Writer's Guild(20%), Literature Foundation(10%)
INSERT INTO product_ben_master (ben_id, product_id, percentage)
SELECT ben_id, productId, perc FROM (
    SELECT 1 as ben_id, 70.00 as perc UNION ALL
    SELECT 2, 20.00 UNION ALL
    SELECT 3, 10.00
) as splits
CROSS JOIN (SELECT product_id as productId FROM product_master) as products
ON DUPLICATE KEY UPDATE percentage = VALUES(percentage);

-- 12. PRODUCT-ATTRIBUTES (Format mapping)
INSERT INTO product_attribute (product_id, attribute_id, attribute_value)
SELECT product_id, 1, 'PDF' FROM product_master WHERE type_id = 1
UNION ALL
SELECT product_id, 1, 'MP3' FROM product_master WHERE type_id = 2
ON DUPLICATE KEY UPDATE attribute_value = VALUES(attribute_value);

-- 13. SAMPLE CUSTOMER FOR ROYALTY TRANSACTIONS (Optional)
INSERT INTO customer (customer_id, first_name, last_name, email, password, active) VALUES 
(1, 'Demo', 'User', 'demo@bookworm.com', '$2a$10$xyz...', 1)
ON DUPLICATE KEY UPDATE first_name = VALUES(first_name);

-- 14. SAMPLE ROYALTY TRANSACTIONS (BRD Section 13.1)
INSERT INTO royalty_transaction (user_id, product_id, author_id, tran_type, qty, sale_price, base_price, royalty_percent, royalty_amount, transaction_date) VALUES 
(1, 1, 1, 'P', 1, 199.00, 299.00, 20.00, 59.80, NOW()),
(1, 13, 3, 'L', 1, 10.00, 10.00, 20.00, 2.00, NOW())
ON DUPLICATE KEY UPDATE sale_price = VALUES(sale_price);

UPDATE product_master SET long_desc =
'Ambulancing On the French Front is a gripping semi-autobiographical narrative that captures the raw reality of war through the eyes of a young volunteer ambulance driver during World War I. The story explores courage, fear, friendship, and the psychological scars left by relentless conflict. Through vivid battlefield scenes and quiet human moments, the book reflects on the futility of war and the endurance of hope. It is both a historical document and a personal journey, offering readers an emotional and thought-provoking experience that remains timeless in its message about humanity under extreme conditions.'
WHERE product_id = 1;

UPDATE product_master SET type_id = 1, long_desc =
'Meri Europe Yatra is a pioneering Indian travelogue written during the early 20th century, offering rare insights into European society, culture, and politics of the time. The author narrates personal experiences, observations, and reflections gathered while journeying across multiple countries. Beyond sightseeing, the book compares Eastern and Western philosophies, social structures, and lifestyles. It remains an important historical record of how an Indian intellectual viewed Europe during a transformative era, blending curiosity, cultural critique, and deep human understanding.'
WHERE product_id = 2;

UPDATE product_master SET long_desc =
'Tagore Anthology is a carefully curated collection of poems, letters, and philosophical writings by Rabindranath Tagore. It highlights his mastery of language, spirituality, and humanism. Each piece reflects themes of love, devotion, freedom, nature, and universal brotherhood. The anthology offers readers both literary beauty and deep introspection. Whether you are new to Tagore or a long-time admirer, this collection provides a meaningful journey through the thoughts of India’s first Nobel Laureate in Literature.'
WHERE product_id = 3;

UPDATE product_master SET long_desc =
'Manav Samaj presents a detailed exploration of human civilization, tracing the evolution of societies, cultures, and belief systems. Written with scholarly depth yet accessible narration, the book discusses how humanity progressed from primitive communities to complex modern structures. It examines social values, ethics, traditions, and historical transformations. The author invites readers to reflect on where humanity has come from and where it is headed. This work serves as both a sociological study and a philosophical reflection on mankind’s collective journey.'
WHERE product_id = 4;

UPDATE product_master SET long_desc =
'Romeo and Juliet is William Shakespeare’s immortal tragedy of love and fate. Set in Verona, the play tells the story of two young lovers whose families are bitter enemies. Their passionate romance blossoms in secrecy but is doomed by misunderstanding and social conflict. Through poetic language, dramatic tension, and emotional depth, Shakespeare explores themes of love, loyalty, destiny, and sacrifice. This timeless masterpiece continues to captivate readers and audiences with its beauty, tragedy, and enduring relevance.'
WHERE product_id = 5;

UPDATE product_master SET long_desc =
'Secrets of Crewe House is a historical war narrative that unfolds within the walls of a mysterious British estate during World War I. The story reveals how information, propaganda, and intelligence operations influenced the outcome of global conflict. With rich period details and suspenseful storytelling, the book explores hidden truths behind public news and political decisions. It is both a wartime thriller and a historical insight into how secrecy and strategy shaped modern warfare.'
WHERE product_id = 6;

UPDATE product_master SET long_desc =
'The Voyage of the Norman D. is an adventurous sea-faring tale based on the journal of a young explorer. It captures the excitement, danger, and wonder of traveling across vast oceans during an age of discovery. Storms, foreign lands, and unexpected friendships fill the journey with thrilling experiences. The narrative blends exploration with personal growth, as the protagonist learns courage and resilience. It is a classic maritime adventure that inspires curiosity about the world beyond the horizon.'
WHERE product_id = 7;

UPDATE product_master SET long_desc =
'Theodosia Ernest is a thought-provoking classic that explores religious beliefs, moral dilemmas, and intellectual debate through rich literary storytelling. Set in an era of philosophical questioning, the book examines faith, doubt, and personal conviction. The characters engage in discussions that challenge societal norms and personal identity. Its elegant prose and reflective tone make it a valuable work for readers who enjoy literature that stimulates both emotional and intellectual exploration.'
WHERE product_id = 8;

UPDATE product_master SET long_desc =
'Bhhoot is a spine-chilling Marathi horror novel filled with eerie atmospheres and supernatural encounters. The story blends local folklore with psychological fear, keeping readers on edge through unexpected twists. Haunted places, restless spirits, and human courage intertwine in a narrative that explores fear beyond the physical world. It is not only a ghost story but also a reflection on belief, superstition, and the unknown forces that shape human imagination.'
WHERE product_id = 9;

UPDATE product_master SET long_desc =
'Rahee is a deeply emotional Marathi novel that follows the life journey of a traveler seeking meaning and identity. Along the way, the protagonist encounters love, hardship, self-discovery, and philosophical reflection. The narrative beautifully captures rural landscapes, human relationships, and internal struggles. It is a story about moving forward despite uncertainty, making it both inspirational and introspective for readers who enjoy literature rooted in realism and emotional depth.'
WHERE product_id = 10;

UPDATE product_master SET long_desc =
'Rowdy Ganpat is a fast-paced Marathi action story filled with humor, drama, and street-smart energy. The protagonist is a rebellious yet lovable character who navigates challenges in society with wit and courage. The narrative balances comedy with gritty action, making it highly entertaining. Beneath the fun lies a subtle message about justice, friendship, and standing up against wrongdoing. It is an engaging read for those who enjoy lively regional storytelling.'
WHERE product_id = 11;

UPDATE product_master SET long_desc =
'Shyamachi Aai is a legendary Marathi classic portraying the pure bond between a mother and her son. Through simple yet powerful storytelling, the book explores love, sacrifice, morality, and emotional strength. The mother’s guidance shapes the child’s values and future. It remains one of Maharashtra’s most cherished literary works, touching generations of readers with its warmth, innocence, and timeless portrayal of parental devotion.'
WHERE product_id = 12;

UPDATE product_master SET long_desc =
'Baal Goshti is a delightful collection of children’s stories designed to educate and entertain young readers. Each tale carries moral lessons, cultural values, and imaginative adventures. The language is simple yet engaging, making it perfect for early learners. Through animals, children, and magical characters, the stories spark curiosity and creativity. It is an ideal audiobook for family listening and nurturing storytelling traditions.'
WHERE product_id = 13;

UPDATE product_master SET long_desc =
'Wishtree is a heartwarming fantasy narrated from the perspective of an ancient oak tree that watches generations of humans pass by. The story explores friendship, nature, wishes, and the silent wisdom of trees. Through gentle storytelling, it reminds readers about kindness, hope, and environmental respect. Its unique narrative voice and emotional warmth make it a memorable and uplifting tale for listeners of all ages.'
WHERE product_id = 14;

UPDATE product_master SET long_desc =
'The Unbecoming of Mara Dyer is a psychological thriller that follows a teenage girl haunted by mysterious events after a tragic accident. Strange powers, shifting realities, and dark secrets unfold as she questions her own sanity. The story combines suspense, romance, and supernatural mystery. With unpredictable twists and emotional tension, it keeps listeners engaged while exploring trauma, identity, and hidden truths.'
WHERE product_id = 15;

UPDATE product_master SET long_desc =
'Mounaat Arth Saare is an audio adaptation of a poetic Marathi drama that explores meaning through silence and introspection. The narrative focuses on emotional expression, relationships, and philosophical reflection. Its dramatic dialogues and poetic rhythm create a powerful listening experience. It is ideal for those who appreciate theater, literature, and artistic storytelling that touches the soul rather than relying on action.'
WHERE product_id = 16;

UPDATE product_master SET long_desc =
'The Nowhere Man is an intense action-thriller centered around international intelligence operations and covert missions. The protagonist is a skilled agent drawn into dangerous conspiracies that threaten global stability. With high-speed chases, strategic planning, and unexpected betrayals, the narrative keeps listeners on edge. It explores loyalty, morality, and survival in a world where trust is fragile and danger is constant.'
WHERE product_id = 17;

UPDATE product_master SET long_desc =
'Kalokh is an immersive Marathi horror audiobook designed to be experienced in darkness for maximum effect. The story unfolds through eerie soundscapes, chilling voices, and unsettling events. It blurs the line between imagination and reality, drawing listeners deep into fear and suspense. Inspired by folklore and psychological horror, Kalokh offers a unique audio storytelling experience that lingers long after the final scene.'
WHERE product_id = 18;
-- ##########################################################
-- END OF SEED SCRIPT
-- ##########################################################
