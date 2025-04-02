client.notify("executed successfully!")
client.notify("script made and updated by oqrnkk")

client.on_event("render", function()
    for i, v in pairs(game:get_service("Workspace"):find_first_child("Bases"):get_children()) do
        if v:find_first_child("Shotgun Turret").address ~= 0 then
            local Turret = v:find_first_child("Shotgun Turret"):find_first_child("Shotgun Turret"):find_first_child("Main")
			if Turret.address ~= 0 then
                local visible, position = client.world_to_screen( Turret:get_position() );
                renderer.text( position , Color3.new(255, 0, 0), "Turret" )
            end
        end
    end
end);
