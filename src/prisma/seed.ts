import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {}

async function seed() {
  const roles = await prisma.$executeRawUnsafe(
    `INSERT INTO apunta.roles (id, rol) VALUES (UUID_TO_BIN('eb2addd2-34f3-4bf3-95e4-9675f66438e3'), "admin"), (UUID_TO_BIN('4f25bb7b-4600-4c39-9533-85414e8d4e40'),"accountant"), (UUID_TO_BIN('6e940a06-b806-4532-b581-dc846b655f1a'),"support"), (UUID_TO_BIN('b6e9ee9f-41e7-4a59-a332-160e7844aa50'),"user");`
  )

  const users = await prisma.$executeRawUnsafe(
    `INSERT INTO apunta.users (id, login, pwd, email, active, roles_id) VALUES (UUID_TO_BIN('6d6a5a2c-8531-437c-9f01-32f5ccf74a88'), 'rapaco@goodidea.com.es', '$2a$10$DC7OiX1./5ytg2cpK3tAxetXVhACQnMcQFYtzAxgghVEBWqYJKVzC','rapaco@goodidea.com.es', 1, UUID_TO_BIN('eb2addd2-34f3-4bf3-95e4-9675f66438e3')), (UUID_TO_BIN('00ff0a82-7666-43bd-b36c-884ff72b95c8'), 'accountant@goodidea.com.es', '$2a$10$DC7OiX1./5ytg2cpK3tAxetXVhACQnMcQFYtzAxgghVEBWqYJKVzC','accountant@goodidea.com.es', 1, UUID_TO_BIN('4f25bb7b-4600-4c39-9533-85414e8d4e40')), (UUID_TO_BIN('433879bb-544d-450f-87cc-f3e18cbc7ea4'), 'support@goodidea.com.es', '$2a$10$DC7OiX1./5ytg2cpK3tAxetXVhACQnMcQFYtzAxgghVEBWqYJKVzC','support@goodidea.com.es', 1, UUID_TO_BIN('6e940a06-b806-4532-b581-dc846b655f1a')), (UUID_TO_BIN('cbb00dfb-3ab7-45cf-a3b3-5f54bd0a87b5'), 'raulpc93@gmail.com', '$2a$10$DC7OiX1./5ytg2cpK3tAxetXVhACQnMcQFYtzAxgghVEBWqYJKVzC','raulpc93@gmail.com', 1, UUID_TO_BIN('b6e9ee9f-41e7-4a59-a332-160e7844aa50'));`
  )

  const profiles = await prisma.$executeRawUnsafe(
    `INSERT INTO apunta.profile (id, name, vat, email, address, users_id) VALUES (UUID_TO_BIN('913c375d-8639-4e59-b611-039fe9440110'),'Administrador','F98812282','rapaco@goodidea.com.es','Juan prim 10',UUID_TO_BIN('6d6a5a2c-8531-437c-9f01-32f5ccf74a88')), (UUID_TO_BIN('7812fddc-23e9-42d3-9bcc-6971f600a9f4'),'Accountant','F98812292','accountant@goodidea.com.es','Juan prim 10',UUID_TO_BIN('00ff0a82-7666-43bd-b36c-884ff72b95c8')), (UUID_TO_BIN('fe552643-d798-4a1e-8840-fef796c2075a'),'Soporte','F98812252','soporte@goodidea.com.es','Juan prim 10',UUID_TO_BIN('433879bb-544d-450f-87cc-f3e18cbc7ea4')), (UUID_TO_BIN('4736b3e0-0254-477f-a92b-cdb253aba3cd'),'Padel Lab, S.L.','B98812282','raulpc93@gmail.com','Benidorm 742',UUID_TO_BIN('cbb00dfb-3ab7-45cf-a3b3-5f54bd0a87b5'));`
  )

  const planes = await prisma.$executeRawUnsafe(
    `INSERT INTO apunta.plan ( id, type, price ) VALUES (UUID_TO_BIN('100bcb12-bfc1-483c-876f-f0055766b0ee'),'basic',39.99), (UUID_TO_BIN('7a06bc7b-d99c-4249-9a2d-21b79dd3124b'),'premium',59.99);`
  )

  const courts = await prisma.$executeRawUnsafe(
    `INSERT INTO apunta.courts (id, mac, match_time, is_streaming_configured, is_available, court_price, users_id, plan_id, title) VALUES (UUID_TO_BIN('251504e8-8c60-11ef-a499-b58783fa5ee6'),"00:00:00:00:11",90,0,1,28.00,UUID_TO_BIN('cbb00dfb-3ab7-45cf-a3b3-5f54bd0a87b5'),UUID_TO_BIN('100bcb12-bfc1-483c-876f-f0055766b0ee'),'First Court'),(UUID_TO_BIN('22308a26-f287-4e26-bec1-a90f0a09b1bd'),"00:00:00:00:22",90,0,1,28.00,UUID_TO_BIN('cbb00dfb-3ab7-45cf-a3b3-5f54bd0a87b5'),UUID_TO_BIN('7a06bc7b-d99c-4249-9a2d-21b79dd3124b'),'Second Court');`
  )

  const devices = await prisma.$executeRawUnsafe(
    `INSERT INTO apunta.devices (id, type, mac, ssid, status, courts_id) VALUES (UUID_TO_BIN(UUID()), "box", '00:00:00:00:11', 'pista1', TRUE, UUID_TO_BIN('251504e8-8c60-11ef-a499-b58783fa5ee6')),(UUID_TO_BIN(UUID()), "sensor", '11:00:00:00:11', 'pista1', TRUE, UUID_TO_BIN('251504e8-8c60-11ef-a499-b58783fa5ee6')),(UUID_TO_BIN(UUID()), "sensor", '22:00:00:00:11', 'pista1', TRUE, UUID_TO_BIN('251504e8-8c60-11ef-a499-b58783fa5ee6')),(UUID_TO_BIN(UUID()), "camera", '11:00:11:00:11', 'pista1', TRUE, UUID_TO_BIN('251504e8-8c60-11ef-a499-b58783fa5ee6')),(UUID_TO_BIN(UUID()), "box", '00:00:00:00:22', 'pista2', TRUE, UUID_TO_BIN('22308a26-f287-4e26-bec1-a90f0a09b1bd')),(UUID_TO_BIN(UUID()), "sensor", '55:00:00:00:11', 'pista2', TRUE, UUID_TO_BIN('22308a26-f287-4e26-bec1-a90f0a09b1bd')),(UUID_TO_BIN(UUID()), "sensor", '66:00:00:00:11', 'pista2', TRUE, UUID_TO_BIN('22308a26-f287-4e26-bec1-a90f0a09b1bd')),(UUID_TO_BIN(UUID()), "camera", '33:00:11:00:11', 'pista2', TRUE, UUID_TO_BIN('22308a26-f287-4e26-bec1-a90f0a09b1bd'));`
  )

  console.log({ roles, users, profiles, planes, courts, devices })
}

main()
  .then(seed)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
