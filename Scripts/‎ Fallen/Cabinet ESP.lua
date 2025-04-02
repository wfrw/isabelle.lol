client.notify("executed successfully!")
client.notify("script made and updated by oqrnkk")

client.on_event("render", function()
    for i, v in pairs(game:get_service("Workspace"):find_first_child("Bases"):get_children()) do
        if v:find_first_child("Base Cabinet").address ~= 0 then
            local Cabinet = v:find_first_child("Base Cabinet"):find_first_child("Base Cabinet"):find_first_child("Main")
			if Cabinet.address ~= 0 then
                local visible, position = client.world_to_screen( Cabinet:get_position() );
                renderer.text( position , Color3.new(255, 255, 255), "Cabinet" )
            end
        end
    end
end);
