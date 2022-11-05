DROP TABLE IF EXISTS product cascade;
DROP TABLE IF EXISTS features cascade;
DROP TABLE IF EXISTS related cascade;
DROP TABLE IF EXISTS styles cascade;
DROP TABLE IF EXISTS skus cascade;
DROP TABLE IF EXISTS photos cascade;

-- PRODUCT TABLE

CREATE TABLE IF NOT EXISTS public.product
(
    id integer NOT NULL,
    name character varying COLLATE pg_catalog."default",
    slogan character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    category character varying COLLATE pg_catalog."default",
    default_price integer,
    CONSTRAINT product_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product
    OWNER to gabeyamartino;

-- FEATURES TABLE

CREATE TABLE IF NOT EXISTS public.product
(
    id integer NOT NULL,
    name character varying COLLATE pg_catalog."default",
    slogan character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    category character varying COLLATE pg_catalog."default",
    default_price integer,
    CONSTRAINT product_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product
    OWNER to gabeyamartino;


-- RELATED TABLE

-- DROP TABLE IF EXISTS public.related;

CREATE TABLE IF NOT EXISTS public.related
(
    id integer NOT NULL,
    current_product_id integer,
    related_product_id integer,
    CONSTRAINT related_pkey PRIMARY KEY (id),
    CONSTRAINT related_fk FOREIGN KEY (current_product_id)
        REFERENCES public.product (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.related
    OWNER to gabeyamartino;
-- Index: related_index

-- DROP INDEX IF EXISTS public.related_index;

CREATE INDEX IF NOT EXISTS related_index
    ON public.related USING btree
    (current_product_id ASC NULLS LAST)
    TABLESPACE pg_default;



-- STYLES TABLE

-- DROP TABLE IF EXISTS public.styles;

CREATE TABLE IF NOT EXISTS public.styles
(
    style_id integer NOT NULL,
    product_id integer,
    name character varying COLLATE pg_catalog."default",
    sale_price smallint,
    original_price integer,
    "default?" boolean,
    CONSTRAINT styles_pkey PRIMARY KEY (style_id),
    CONSTRAINT style_fk FOREIGN KEY (product_id)
        REFERENCES public.product (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.styles
    OWNER to gabeyamartino;
-- Index: fki_style_fk

-- DROP INDEX IF EXISTS public.fki_style_fk;

CREATE INDEX IF NOT EXISTS fki_style_fk
    ON public.styles USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;


-- DROP TABLE IF EXISTS public.skus;

CREATE TABLE IF NOT EXISTS public.skus
(
    id integer NOT NULL,
    style_id integer,
    size character varying COLLATE pg_catalog."default",
    quantity integer,
    CONSTRAINT skus_pkey PRIMARY KEY (id),
    CONSTRAINT skus_fk FOREIGN KEY (style_id)
        REFERENCES public.styles (style_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.skus
    OWNER to gabeyamartino;
-- Index: fki_skus_fk

-- DROP INDEX IF EXISTS public.fki_skus_fk;

CREATE INDEX IF NOT EXISTS fki_skus_fk
    ON public.skus USING btree
    (style_id ASC NULLS LAST)
    TABLESPACE pg_default;


-- PHOTOS TABLE

-- DROP TABLE IF EXISTS public.photos;

CREATE TABLE IF NOT EXISTS public.photos
(
    id integer NOT NULL,
    style_id integer,
    url character varying COLLATE pg_catalog."default",
    thumbnail_url character varying COLLATE pg_catalog."default",
    CONSTRAINT photos_pkey PRIMARY KEY (id),
    CONSTRAINT photos_fk FOREIGN KEY (style_id)
        REFERENCES public.styles (style_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.photos
    OWNER to gabeyamartino;
-- Index: fki_photos_fk

-- DROP INDEX IF EXISTS public.fki_photos_fk;

CREATE INDEX IF NOT EXISTS fki_photos_fk
    ON public.photos USING btree
    (style_id ASC NULLS LAST)
    TABLESPACE pg_default;