#Código do para executar no mobile para coletar os Dados e enviar para o Servidor.. 
#Para rodar basta apenas configurar o IP do servidor e Executar no Termux, OBS: TERMUX-API tem que estar baixado

import os
import json
import platform
import time


try:
    import requests
except ImportError:
    os.system("pkg install python-requests -y")
    import requests


def coletar_dados():
  
    try:
        bateria = json.loads(os.popen("termux-battery-status").read())
    except:
        bateria = {}

    # Coleta info da CPU
    cpu_info = {
        "cpu": platform.processor(),
        "cores": os.cpu_count()
    }

    # Coleta info da RAM
    try:
        ram_raw = os.popen("free -m").read().splitlines()[1].split()
        ram_info = {
            "total": ram_raw[1],
            "used": ram_raw[2],
            "free": ram_raw[3]
        }
    except:
        ram_info = {}

    # Coleta info de Armazenamento
    try:
        storage_raw = os.popen("df -h /").read().splitlines()[1].split()
        storage_info = {
            "size": storage_raw[1],
            "used": storage_raw[2],
            "available": storage_raw[3]
        }
    except:
        storage_info = {}

    # Coleta info do Sistema
    system_info = {
        "system": platform.system(),
        "release": platform.release(),
        "version": platform.version()
    }

   
    device_id = platform.node()

    # Payload
    dados = {
        "celular": device_id,
        "bateria": bateria,
        "cpu": cpu_info,
        "ram": ram_info,
        "armazenamento": storage_info,
        "sistema": system_info
    }

    return dados


def iniciar_monitoramento():
    IP = "172.16.1.102:3000"
    url = f"http://{IP}/api/dados"

    print(f"Monitoramento iniciado. Enviando dados para {url}")

    while True:
        dados = coletar_dados()

        try:
            print("\n DADOS ENVIADOS ")
            print(json.dumps(dados, indent=2, ensure_ascii=False))

            res = requests.post(url, json=dados, timeout=5)

            hora_atual = time.strftime('%H:%M:%S')

            print(f"\n[{hora_atual}] Status HTTP: {res.status_code}")

            print("\n RESPOSTA DO SERVIDOR ")
            print(res.text)

        except Exception as e:
            hora_atual = time.strftime('%H:%M:%S')
            print(f"\n[{hora_atual}] ERRO:")
            print(str(e))

        time.sleep(10)


if __name__ == "__main__":
    iniciar_monitoramento()