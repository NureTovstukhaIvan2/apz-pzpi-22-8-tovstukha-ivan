# Генерація ключа для симетричного шифрування (AES)
def generate_symmetric_key():
    return get_random_bytes(32)  # 256 біт для AES

# Шифрування повідомлення за допомогою AES
def encrypt_message(key, message):
    cipher = AES.new(key, AES.MODE_CBC)
    ciphertext = cipher.encrypt(pad(message.encode(), AES.block_size))
    return cipher.iv + ciphertext  # Повертаємо IV разом з шифрованим повідомленням

# Розшифрування повідомлення
def decrypt_message(key, encrypted_message):
    iv = encrypted_message[:16]  # Перші 16 байт - IV
    ciphertext = encrypted_message[16:]
    cipher = AES.new(key, AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(ciphertext), AES.block_size).decode()

# Генерація пари ключів RSA
def generate_rsa_keys():
    key = RSA.generate(2048)
    private_key = key.export_key()
    public_key = key.publickey().export_key()
    return private_key, public_key

# Підписування повідомлення за допомогою RSA
def sign_message(private_key, message):
    key = RSA.import_key(private_key)
    h = hashlib.sha256(message.encode()).digest()
    signature = pkcs1_15.new(key).sign(h)
    return signature

# Перевірка підпису повідомлення
def verify_signature(public_key, message, signature):
    key = RSA.import_key(public_key)
    h = hashlib.sha256(message.encode()).digest()
    try:
        pkcs1_15.new(key).verify(h, signature)
        return True
    except (ValueError, TypeError):
        return False

def mtproto_logic():
    # Генерація ключів
    symmetric_key = generate_symmetric_key()
    private_key, public_key = generate_rsa_keys()

    # Оригінальне повідомлення
    message = "MTProto message!"

    # Шифрування повідомлення
    encrypted_message = encrypt_message(symmetric_key, message)
    print("Encrypted Message:", encrypted_message)

    # Розшифрування повідомлення
    decrypted_message = decrypt_message(symmetric_key, encrypted_message)
    print("Decrypted Message:", decrypted_message)

    # Підписування повідомлення
    signature = sign_message(private_key, message)
    print("Message Signature:", signature)

    # Перевірка підпису
    is_valid = verify_signature(public_key, message, signature)
    print("Signature valid:", is_valid)
