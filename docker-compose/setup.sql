CREATE TABLE public.users (
	id bigserial NOT NULL,
    "email" varchar(255) NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE public.recieps (
	id bigserial NOT NULL,
    "name" text NULL,
    main_ingredient text NULL,
    create_time timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
    publish_time timestamptz NULL,
	user_id int8 NULL,
    CONSTRAINT reciep_pkey PRIMARY KEY (id),
    CONSTRAINT reciep_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL
);

CREATE TABLE public.reviews (
	id bigserial NOT NULL,
    rating_value int8 NULL,
    user_id int8 NOT NULL,
    reciep_id int8 NOT NULL,
    create_time timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT review_pkey PRIMARY KEY (id),
    CONSTRAINT review_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
    CONSTRAINT review_reciep_id_foreign FOREIGN KEY (reciep_id) REFERENCES public.recieps(id) ON DELETE CASCADE
);
