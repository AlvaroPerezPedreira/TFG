package com.tfg.TFG.rest.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tfg.TFG.model.entities.Client;
import com.tfg.TFG.model.entities.ClientDao;

@RestController
@RequestMapping("/clients")
public class ClientsController {

    private final ClientDao clientDao;

    public ClientsController(ClientDao clientDao) {
        this.clientDao = clientDao;
    }

    @GetMapping
    public List<Client> getClients() {
        return clientDao.findAll();
    }

    @GetMapping("/{id}")
    public Client getClient(@PathVariable Long id) {
        return clientDao.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client client) throws URISyntaxException {
        Client savedClient = clientDao.save(client);
        return ResponseEntity.created(new URI("/clients/" + savedClient.getId())).body(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client client) {
        Client currentClient = clientDao.findById(id).orElseThrow(RuntimeException::new);
        currentClient.setName(client.getName());
        currentClient.setEmail(client.getEmail());
        currentClient = clientDao.save(client);

        return ResponseEntity.ok(currentClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Client> deleteClient(@PathVariable Long id) {
        clientDao.deleteById(id);
        return ResponseEntity.ok().build();
    }
}