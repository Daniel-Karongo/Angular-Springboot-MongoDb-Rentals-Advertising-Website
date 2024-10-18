package com.housesearchKE.property_owners_service.controller;

import com.housesearchKE.property_owners_service.dto.PropertiesDTO;
import com.housesearchKE.property_owners_service.model.PropertyOwner;
import com.housesearchKE.property_owners_service.service.OwnersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("owners")
public class Owners_Controller {
    @Autowired
    private OwnersService ownersService;

    @GetMapping("")
    public ResponseEntity<List<PropertyOwner>> getAllPropertyOwners() {
        return ownersService.getAllPropertyOwners();
    }

    @GetMapping("owner/{id}")
    public ResponseEntity<Optional<PropertyOwner>> getPropertyOwner(@PathVariable("id") String id) {
        return ownersService.getPropertyOwner(id);
    }

    @PostMapping ("owner")
    public ResponseEntity<PropertyOwner> savePropertyOwner(@RequestBody PropertyOwner owner) {
        return ownersService.savePropertyOwner(owner);
    }

    @PostMapping ("owners")
    public ResponseEntity<List<PropertyOwner>> savePropertyOwners(@RequestBody List<PropertyOwner> owners) {
        return ownersService.savePropertyOwners(owners);
    }

    @GetMapping ("properties/{ownerId}")
    public ResponseEntity<List<PropertiesDTO>> savePropertyOwners(@PathVariable("ownerId") String ownerId) {
        return ownersService.getAllOwnersProperties(ownerId);
    }
}
