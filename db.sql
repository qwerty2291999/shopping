PGDMP                     	    y            shopping    13.4    13.4 Q    :           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ;           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            <           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            =           1262    16394    shopping    DATABASE     l   CREATE DATABASE shopping WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE shopping;
                postgres    false            �            1259    17585    admin    TABLE     �   CREATE TABLE public.admin (
    id integer NOT NULL,
    username character varying(500) NOT NULL,
    password character varying(500) NOT NULL,
    name character varying(500) NOT NULL
);
    DROP TABLE public.admin;
       public         heap    postgres    false            �            1259    17598    admin_id_seq    SEQUENCE     �   ALTER TABLE public.admin ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.admin_id_seq
    START WITH 100000000
    INCREMENT BY 1
    MINVALUE 100000000
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    218            �            1259    17119    category    TABLE     �   CREATE TABLE public.category (
    id integer NOT NULL,
    category character varying(500) NOT NULL,
    status character varying(500) NOT NULL,
    banner json NOT NULL,
    icon json NOT NULL
);
    DROP TABLE public.category;
       public         heap    postgres    false            �            1259    17137    category_id_seq    SEQUENCE     �   ALTER TABLE public.category ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.category_id_seq
    START WITH 100000000
    INCREMENT BY 1
    MINVALUE 100000000
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    206            �            1259    17146 	   flashsale    TABLE     �  CREATE TABLE public.flashsale (
    id integer NOT NULL,
    "itemId" integer NOT NULL,
    "itemName" character varying(500) NOT NULL,
    "itemPrice" integer NOT NULL,
    "itemImg" json NOT NULL,
    "itemSalePrice" integer NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    quantity integer NOT NULL,
    "itemNewPrice" integer NOT NULL,
    status character varying(500) NOT NULL,
    "categoryId" integer
);
    DROP TABLE public.flashsale;
       public         heap    postgres    false            �            1259    17144    flashsale_id_seq    SEQUENCE     �   ALTER TABLE public.flashsale ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.flashsale_id_seq
    START WITH 100000000
    INCREMENT BY 1
    MINVALUE 100000000
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    209            �            1259    17619 
   forgotpass    TABLE     �   CREATE TABLE public.forgotpass (
    id integer NOT NULL,
    email character varying(500) NOT NULL,
    code integer NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    status character varying(500) NOT NULL
);
    DROP TABLE public.forgotpass;
       public         heap    postgres    false            �            1259    17617    forgotpass_id_seq    SEQUENCE     �   ALTER TABLE public.forgotpass ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.forgotpass_id_seq
    START WITH 100000000
    INCREMENT BY 1
    MINVALUE 100000000
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    223            �            1259    17575    itemAttributes    TABLE     �   CREATE TABLE public."itemAttributes" (
    id integer NOT NULL,
    "itemId" integer NOT NULL,
    color character varying(500),
    type character varying(500) NOT NULL
);
 $   DROP TABLE public."itemAttributes";
       public         heap    postgres    false            �            1259    17583    itemAttributes_id_seq    SEQUENCE     �   ALTER TABLE public."itemAttributes" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."itemAttributes_id_seq"
    START WITH 100000000
    INCREMENT BY 1
    MINVALUE 100000000
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    216            �            1259    16535    items    TABLE     �  CREATE TABLE public.items (
    id integer NOT NULL,
    barcode bigint NOT NULL,
    "importPrice" integer NOT NULL,
    "sellingPrice" integer NOT NULL,
    weight numeric NOT NULL,
    mainimg json NOT NULL,
    quantity integer NOT NULL,
    desciption character varying(500) NOT NULL,
    name character varying(500) NOT NULL,
    detailimgs json NOT NULL,
    "categoryId" integer NOT NULL,
    "categoryName" character varying(500) NOT NULL,
    "categoryStatus" character varying(500) NOT NULL
);
    DROP TABLE public.items;
       public         heap    postgres    false            �            1259    16533    items_id_seq    SEQUENCE     �   ALTER TABLE public.items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.items_id_seq
    START WITH 100000000
    INCREMENT BY 1
    MINVALUE 100000000
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    205            �            1259    16515    notifications    TABLE     �   CREATE TABLE public.notifications (
    id integer NOT NULL,
    "flashsaleId" integer NOT NULL,
    "userId" integer NOT NULL,
    "notiInfo" character varying(500) NOT NULL,
    "dateTime" timestamp with time zone NOT NULL
);
 !   DROP TABLE public.notifications;
       public         heap    postgres    false            �            1259    16513    notifications_id_seq    SEQUENCE     �   ALTER TABLE public.notifications ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.notifications_id_seq
    START WITH 100000000
    INCREMENT BY 1
    MINVALUE 100000000
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    203            �            1259    17189    orders    TABLE       CREATE TABLE public.orders (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "itemId" integer,
    "flashsaleId" integer,
    "itemName" character varying(500) NOT NULL,
    "itemPrice" integer NOT NULL,
    "itemQuantity" integer NOT NULL,
    total integer NOT NULL,
    "itemImg" json NOT NULL,
    "itemDiscount" integer,
    "itemNewPrice" integer,
    "categoryId" integer NOT NULL,
    "attributeId" integer,
    "attributeColor" character varying(500),
    "attributeType" character varying(500)
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    17573    orders_id_seq    SEQUENCE     �   ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.orders_id_seq
    START WITH 100000000
    INCREMENT BY 1
    MINVALUE 100000000
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    210            �            1259    17527 
   ordersmain    TABLE       CREATE TABLE public.ordersmain (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    code character varying,
    status character varying NOT NULL,
    "totalPrice" integer NOT NULL,
    "userPhoneNumber" integer NOT NULL,
    "userAddress" character varying(500) NOT NULL
);
    DROP TABLE public.ordersmain;
       public         heap    postgres    false            �            1259    17571    ordersmain_id_seq    SEQUENCE     �   ALTER TABLE public.ordersmain ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.ordersmain_id_seq
    START WITH 100000000
    INCREMENT BY 1
    MINVALUE 100000000
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    213            �            1259    17602    roles    TABLE     �   CREATE TABLE public.roles (
    id integer NOT NULL,
    "adminId" integer NOT NULL,
    role character varying(500) NOT NULL
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    17600    roles_id_seq    SEQUENCE     �   ALTER TABLE public.roles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_id_seq
    START WITH 100000000
    INCREMENT BY 1
    MINVALUE 100000000
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    221            �            1259    16485    users    TABLE     o  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    address character varying(200) NOT NULL,
    verify character varying(200) NOT NULL,
    password character varying(500) NOT NULL,
    "phoneNumber" character varying NOT NULL,
    email character varying(200) NOT NULL,
    username character varying(200) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16483    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 100000000
    INCREMENT BY 1
    MINVALUE 100000000
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    201            �            1259    17312    voucher    TABLE     a  CREATE TABLE public.voucher (
    id integer NOT NULL,
    discount integer NOT NULL,
    "categoryId" integer,
    "itemId" integer,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    status character varying(200) NOT NULL,
    quantity integer NOT NULL,
    code character varying(500) NOT NULL
);
    DROP TABLE public.voucher;
       public         heap    postgres    false            �            1259    17310    voucher1_id_seq    SEQUENCE     �   ALTER TABLE public.voucher ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.voucher1_id_seq
    START WITH 100000000
    INCREMENT BY 1
    MINVALUE 100000000
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    212            2          0    17585    admin 
   TABLE DATA           =   COPY public.admin (id, username, password, name) FROM stdin;
    public          postgres    false    218   �g       &          0    17119    category 
   TABLE DATA           F   COPY public.category (id, category, status, banner, icon) FROM stdin;
    public          postgres    false    206   eh       )          0    17146 	   flashsale 
   TABLE DATA           �   COPY public.flashsale (id, "itemId", "itemName", "itemPrice", "itemImg", "itemSalePrice", "startDate", "endDate", quantity, "itemNewPrice", status, "categoryId") FROM stdin;
    public          postgres    false    209   Tj       7          0    17619 
   forgotpass 
   TABLE DATA           J   COPY public.forgotpass (id, email, code, "expiresAt", status) FROM stdin;
    public          postgres    false    223   $l       0          0    17575    itemAttributes 
   TABLE DATA           E   COPY public."itemAttributes" (id, "itemId", color, type) FROM stdin;
    public          postgres    false    216   Al       %          0    16535    items 
   TABLE DATA           �   COPY public.items (id, barcode, "importPrice", "sellingPrice", weight, mainimg, quantity, desciption, name, detailimgs, "categoryId", "categoryName", "categoryStatus") FROM stdin;
    public          postgres    false    205   ^l       #          0    16515    notifications 
   TABLE DATA           \   COPY public.notifications (id, "flashsaleId", "userId", "notiInfo", "dateTime") FROM stdin;
    public          postgres    false    203   \t       *          0    17189    orders 
   TABLE DATA           �   COPY public.orders (id, "orderId", "itemId", "flashsaleId", "itemName", "itemPrice", "itemQuantity", total, "itemImg", "itemDiscount", "itemNewPrice", "categoryId", "attributeId", "attributeColor", "attributeType") FROM stdin;
    public          postgres    false    210   yt       -          0    17527 
   ordersmain 
   TABLE DATA           p   COPY public.ordersmain (id, "userId", code, status, "totalPrice", "userPhoneNumber", "userAddress") FROM stdin;
    public          postgres    false    213   �t       5          0    17602    roles 
   TABLE DATA           4   COPY public.roles (id, "adminId", role) FROM stdin;
    public          postgres    false    221   �t       !          0    16485    users 
   TABLE DATA           d   COPY public.users (id, name, address, verify, password, "phoneNumber", email, username) FROM stdin;
    public          postgres    false    201   �t       ,          0    17312    voucher 
   TABLE DATA           w   COPY public.voucher (id, discount, "categoryId", "itemId", "startDate", "endDate", status, quantity, code) FROM stdin;
    public          postgres    false    212   �u       >           0    0    admin_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.admin_id_seq', 100000010, true);
          public          postgres    false    219            ?           0    0    category_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.category_id_seq', 100000030, true);
          public          postgres    false    207            @           0    0    flashsale_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.flashsale_id_seq', 100000034, true);
          public          postgres    false    208            A           0    0    forgotpass_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.forgotpass_id_seq', 100000002, true);
          public          postgres    false    222            B           0    0    itemAttributes_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."itemAttributes_id_seq"', 100000011, true);
          public          postgres    false    217            C           0    0    items_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.items_id_seq', 100000098, true);
          public          postgres    false    204            D           0    0    notifications_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.notifications_id_seq', 100000000, false);
          public          postgres    false    202            E           0    0    orders_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.orders_id_seq', 100000071, true);
          public          postgres    false    215            F           0    0    ordersmain_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.ordersmain_id_seq', 100000031, true);
          public          postgres    false    214            G           0    0    roles_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.roles_id_seq', 100000004, true);
          public          postgres    false    220            H           0    0    users_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.users_id_seq', 100000048, true);
          public          postgres    false    200            I           0    0    voucher1_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.voucher1_id_seq', 100000022, true);
          public          postgres    false    211            �           2606    17592    admin admin_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public            postgres    false    218            �           2606    17616    admin admin_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_username_key;
       public            postgres    false    218            {           2606    17140    category category_category_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_category_key UNIQUE (category);
 H   ALTER TABLE ONLY public.category DROP CONSTRAINT category_category_key;
       public            postgres    false    206            }           2606    17126    category category_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    206                       2606    17154    flashsale flashsale_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.flashsale
    ADD CONSTRAINT flashsale_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.flashsale DROP CONSTRAINT flashsale_pkey;
       public            postgres    false    209            �           2606    17626    forgotpass forgotpass_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.forgotpass
    ADD CONSTRAINT forgotpass_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.forgotpass DROP CONSTRAINT forgotpass_pkey;
       public            postgres    false    223            �           2606    17582 "   itemAttributes itemAttributes_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."itemAttributes"
    ADD CONSTRAINT "itemAttributes_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."itemAttributes" DROP CONSTRAINT "itemAttributes_pkey";
       public            postgres    false    216            y           2606    16542    items items_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public            postgres    false    205            w           2606    16522     notifications notifications_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.notifications DROP CONSTRAINT notifications_pkey;
       public            postgres    false    203            �           2606    17196    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    210            �           2606    17531    ordersmain ordersmain_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.ordersmain
    ADD CONSTRAINT ordersmain_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.ordersmain DROP CONSTRAINT ordersmain_pkey;
       public            postgres    false    213            �           2606    17606    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    221            q           2606    16821    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    201            s           2606    16492    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            u           2606    16827    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    201            �           2606    17441    voucher voucher_code_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.voucher
    ADD CONSTRAINT voucher_code_key UNIQUE (code);
 B   ALTER TABLE ONLY public.voucher DROP CONSTRAINT voucher_code_key;
       public            postgres    false    212            �           2606    17520    voucher voucher_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.voucher
    ADD CONSTRAINT voucher_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.voucher DROP CONSTRAINT voucher_pkey;
       public            postgres    false    212            �           2606    17184    flashsale flashsale_itemId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.flashsale
    ADD CONSTRAINT "flashsale_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id) NOT VALID;
 K   ALTER TABLE ONLY public.flashsale DROP CONSTRAINT "flashsale_itemId_fkey";
       public          postgres    false    2937    205    209            �           2606    17593 )   itemAttributes itemAttributes_itemId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."itemAttributes"
    ADD CONSTRAINT "itemAttributes_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id) NOT VALID;
 W   ALTER TABLE ONLY public."itemAttributes" DROP CONSTRAINT "itemAttributes_itemId_fkey";
       public          postgres    false    205    216    2937            �           2606    17159    items items_categoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.category(id) NOT VALID;
 G   ALTER TABLE ONLY public.items DROP CONSTRAINT "items_categoryId_fkey";
       public          postgres    false    205    2941    206            �           2606    16815 '   notifications notifications_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) NOT VALID;
 S   ALTER TABLE ONLY public.notifications DROP CONSTRAINT "notifications_userId_fkey";
       public          postgres    false    203    2931    201            �           2606    17252    orders orders_flashsaleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_flashsaleId_fkey" FOREIGN KEY ("flashsaleId") REFERENCES public.flashsale(id) NOT VALID;
 J   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_flashsaleId_fkey";
       public          postgres    false    210    209    2943            �           2606    17247    orders orders_itemId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id) NOT VALID;
 E   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_itemId_fkey";
       public          postgres    false    210    2937    205            �           2606    17566    orders orders_orderId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.ordersmain(id) NOT VALID;
 F   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_orderId_fkey";
       public          postgres    false    2951    210    213            �           2606    17561    ordersmain ordersmain_code_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ordersmain
    ADD CONSTRAINT ordersmain_code_fkey FOREIGN KEY (code) REFERENCES public.voucher(code) NOT VALID;
 I   ALTER TABLE ONLY public.ordersmain DROP CONSTRAINT ordersmain_code_fkey;
       public          postgres    false    2947    212    213            �           2606    17551 !   ordersmain ordersmain_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ordersmain
    ADD CONSTRAINT "ordersmain_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) NOT VALID;
 M   ALTER TABLE ONLY public.ordersmain DROP CONSTRAINT "ordersmain_userId_fkey";
       public          postgres    false    2931    201    213            �           2606    17610    roles roles_adminId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "roles_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public.admin(id) NOT VALID;
 D   ALTER TABLE ONLY public.roles DROP CONSTRAINT "roles_adminId_fkey";
       public          postgres    false    2955    221    218            �           2606    17350    voucher voucher_categoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.voucher
    ADD CONSTRAINT "voucher_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.category(id) NOT VALID;
 K   ALTER TABLE ONLY public.voucher DROP CONSTRAINT "voucher_categoryId_fkey";
       public          postgres    false    2941    212    206            �           2606    17355    voucher voucher_itemId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.voucher
    ADD CONSTRAINT "voucher_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id) NOT VALID;
 G   ALTER TABLE ONLY public.voucher DROP CONSTRAINT "voucher_itemId_fkey";
       public          postgres    false    212    205    2937            2   �   x�]�MB@ �����]�9�c*��1����GX"�ԯόq�=���%�5+0V9����Zm��c��U��|�+JD���-�ً���,b���`����d�3�Yᣄ��< -8���V���)��GL-�%��?x�]��i/���®��х�Y�����o" �K8�      &   �  x�͖�n�0���#����6��j^��8�[������\���QB$��2���q0|8��61V�����?�ƻ�
�q�c�6!���^��o}0���.Zk�zn��낍�[�Qk?���7nxk�Xߘ�{xn]Y�~�ut�x|��w�۰{���Ŷ��R{m�r�zxm�h��o|�&D2΅f�SJ�"
k�H�N��f�͗J�I-5gj��1%J�?!�-Tz�/G�kՆ� ǁ�ď!�4�
+�N�-��HPaQ�}N�d��|x�-�6Z���A4�f�%����h�N�-A����᜗��;	�:�$��r�:3�Ë*�.�8���\������m���.w!�Z1���ZPB9:s��*SPaw�b^P���%��H�LH*��B�w���R�-��e8��Lw[bӌ��+lpqN�k�%�^Z$IK����G���Y|�K~�L"!%��PΩ���]�%�>Z�y�0�k      )   �  x�͔Mo� ���W�|m��i`��z�Rz̅�ɚ��&�ڪ���.��l��J{���w�y�#�����c�zk[��"s�����k��]�+{����2������P���0�.Ա�� ���+��]�>̹��w�0�9�qS�}����;���>��dj�0�Vs����Bs�8t�6����e��B2�+��Ɣ&��?�6�Ԟ�j�s�9<����#J���$|�bJ0�bvD��J���H��HT Z['��=1b��gOk��wc������>�n�-	V�0�+8�gޮ���Gn��Ul��kز��M-������ގi�)��!u�i���+`'	����JpB���k�{�K�w��J�4L�� �� h�b��g|��1!q�oΎ�!���x}j�!�r\�Z*���k����GN�h���G�W��,'�N8qR�m�����      7      x������ � �      0      x������ � �      %   �  x��\Ko#�>��
A���]]o�r1����wE["	�N���&嬤�I��̐Xp�do}S�T]Տ��{�v(f�E�:��:�o�=w����\�ݬf���o��g������W����jv��Ç��|��[��qS]�����S������~y�����m���O���,j˛��6�l��U��o~��_�������y��x��l�T��0�������ܭg7���?.�O� �ą��($De.�^��f��=�^?a�ˣ������<�����ϋ�������M�ۧ���/�R�����{�i�x��WSd�$G����r ��#WehH_�s��V�u}�n�����|�������f�g �PT
��%���RU5����g96
�a�i���7��Bܐ�^����"�7��$e��]��(+�̩�y�p�������$CBuȍ�ac���i����Q+�0.�?'
y�F)� �)��+L�^PX.BW�<S)�Ъ�b\��V��3Bi����:���e�V�0�q�c8G�Y��8IY�CF#�� ަ����q�#�X�9�Ɍ�������A�'�#�-��*�|=�E��XH�/�� J���l�`�����$aT!I�bQi�=�_�Q��,�ܒb�B��*�0^��!%ը����j⋻�]ٽ��c�t< 2�:�$�cr�� Ƌ�����՟f�W��=��=�>NSG"	{�=��D^�ϙ5a`ʢ��� �.�brc�c��3L���E�$�z^����t���lh>�T�$v5�J��I���i���6�^R�P�6�
Hq�&����
��3�dPB�E@�Ly�y�Y���m��'���{QT/2�_#�<��⥅� \��PNu����H�bLYI�3O�٣��J: 0q%-`�\�2z$-�o�4%�N�B��&���9�܆�Q��\��*G�Cv���F=�1i%�{N��!��	�>��+�F�"�(���Q�a������B��5
�gS�GO��gɯ���)F�hRZl�<�ѳ������מ����v=b!E�רI/��l��"�I��
Nmz�YIu}�f���r ��u�qE^xf:E1̶��^���YL����WY)w�D��iy�f�����vs�^-���3��Y�۽�ww��0�Ӑ���{Q��6������~��8��]�nv��c�^x6͙<}qwg�~e�=�E��c|�	��37��A�|��F�$���a0�<��j���n1�>�W��kM��1!B|���"Z�v's7#kчP����밢X��U�E�����b$V,�n�i��(�W�pP�8��l��('��A����}�]��:=i�aL�\8aO�FJ1�4��#P5�����uw�`r�(�TK�`?e�ʻ���jD!J�HF�����G�!Q%ԱY0����j&�Ջ��E�nE��ެ�;�r��N6�uÜ�

�U�qe�ڻ��&R��]��L[{w�&5��n�����kb]�`�{�\'��stY�6y�(�����b�f�Ь�;�2q���Q�'G�0RQ�����$���J{��>�P:��E�Q�y�?����Ցa�����x�$�&ƚ���9���{�K�����_�w�ˇm���G)수�$�% 5����.���p����g�@i�Y��)sO?"v7o�Y����W*1w��k�]�I�އ7����<| qH���33>d��D���9���-�.���'��w>$7�(XJn�Y��)sF��X(�k�Y���D�:Uu���x�u,�K=��
��?��4h��dR2P��@��k�e���vyɥ�#��]����9CKf�"-(�1�Hr=��2�q��h߭���=y��"i�).رh�\����;|�x��R�3�Xz�O��zx$�bϬ-T���I2)������+Bc���4IQ��W���ۿ<�_91�S=Ƨ�٭z����[���ٟ0g��*e�s���?J x��ݻ� ��/,      #      x������ � �      *      x������ � �      -      x������ � �      5   -   x�34� cNC(˜31%73��7��p�&�%��q��qqq mV�      !   �   x�mλ�0@�}
���B7!�1B�ť���r3����8�Mg<���J\�V�Q��n$�Ac�6Sޑ�gԇ�D<�!��ʌ�:�]"S ����y����׼��gP��W�(� \�(f)+u�����[V�4��Av� L�oc��J4\      ,   �   x�u�1� Fg���}W�ЍI젍q�bLw��7�ZH������@� 1��31*P�uwD�3{jW¼%�������b�a�z���)zC[�7QB�)�s��:�����2�nP�v�@�R ���X�_`�w̼���N�R�r0�c/�ZJ��M{     