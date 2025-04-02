client.notify("executed successfully!")
client.notify("script made and updated by oqrnkk")

client.on_event("render", function()
    local maxNodes = 50
    local displayed = 0

    local nodes = game:get_service("Workspace"):find_first_child("Nodes")
    if not nodes then return end

    for i, v in pairs(nodes:get_children()) do
        if displayed >= maxNodes then break end

        if v.address ~= 0 then
            local Node = v:find_first_child("Main")
            if Node and Node.address ~= 0 then
                local visible, position = client.world_to_screen(Node:get_position())

                if visible and position then 
                    local nameMappings = {
                        ["Metal_Node"] = "Metal",
                        ["Stone_Node"] = "Stone",
                        ["Phosphate_Node"] = "Phosphate"
                    }
                    local displayName = nameMappings[v.name] or v.name
                    renderer.text(position, Color3.new(255, 255, 125), displayName)

                    displayed = displayed + 1
                end
            end
        end
    end
end);
